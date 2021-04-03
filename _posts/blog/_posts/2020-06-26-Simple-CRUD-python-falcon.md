---
title: Implementing simple API using Python Falcon
layout: blog-specific
author: eddrichjanzzen
date: 2020-06-26
category: blog
tags: 
- python
- tech
description: A short article about implementing API using Python Falcon Micro Framework. 
---

The advent of technology has produced many different programming languages that developers can use. From the low level languages such as C, C++, and Assembly Language, to the more high level languages such as Ruby and Python, indeed, technology has reached new heights.

![Python](/assets/images/blog/python-logo.png){:class="img-blog-right"}

One of the emerging programming languages in modern day is Python. It has gained its popularity for being simple yet at the same time very expressive. It is simple in the sense that the code resembles how humans think, which makes it very human understandable. It is expressive in the sense that it enables developers to write fewer lines of code for tasks that require more code in other languages. For these reasons, Python has been adopted as a language commonly used to build simple yet powerful scripts. As a matter of fact, it has become one of the staple tools in the field of data science; used to perform complex tasks such as data cleaning, machine learning, and even building neural networks. 

However, one of the underrated capabilities that not everyone sees, is how Python can be used to create simple and powerful APIs. Using libraries such as Python Django, Python Flask, one can develop simple back-ends fewer lines of code compared to other languages. The simple yet expressive nature of Python make it one of the few ideal languages for microservice architectures.   


#### Python Falcon 
![Falcon](/assets/images/blog/falcon.jpg){:class="img-blog"}

In today's article, we will be talking about an emerging framework for building simple APIs. We will be going through how to set up a simple API with Create, Read, Update, and Delete functionalities using the [Python Falcon](https://falconframework.org/#sectionAbout) framework. 

What is Falcon? 

Falcon is a minimalist microframework designed to support the demanding needs of large scale microservices. It is fast and reliable because it compiles with Cython when available. Based on benchmarking tests, Falcon is able to outperform some of the famous microframeworks such as Bottle, Flask, and Werkzeug. 

The speed up is just insane. For large scale microservices with high traffic, Falcon is the way to go. :raised_hands: [Read more](https://falconframework.org/#sectionBenchmarks)


#### Setting up 

Falcon's architecture follows certain concepts from the REST architectural style. Important to both REST and the falcon framework is the concept of "resource". A resource is simply everything the system would need that can be accessed by a url. 

Behind this is a "resource controller" which is controls how the resources behave. It is in charge of orchestrating the requested action and composing a valid result. 

Below is an example of a resource controller:

```python
class ProductResource(object):
	
	def on_get(self, req, resp):

		try:
			logger.info("Performing get all products...")
			
			resp.body = ujson.dumps({'products': products})
			resp.status = falcon.HTTP_200

		except Exception as e:

			logger.error(e, exc_info=True)

			resp.body = ujson.dumps({"error": e})
			resp.status = falcon.HTTP_502


	def on_get_product(self, req, resp, product_id):

		try:
			logger.info("Performing get product...")
			
			product = [p for p in products if str(p['id']) == str(product_id)]

			if product == []:

				resp.body = ujson.dumps({'error': 'product not found.'})
				resp.status = falcon.HTTP_404

			else: 

				resp.body = ujson.dumps({'products': product[0]})
				resp.status = falcon.HTTP_200



		except Exception as e:

			logger.error(e, exc_info=True)

			resp.body = ujson.dumps({"error": e})
			resp.status = falcon.HTTP_502


	def on_post(self, req, resp):

		try:
			logger.info("Performing post request...")

			body = req.context['request']

			product = {
				'id': body['id'],
				'name': body['name'],
				'stock' : body['stock'],
				'price' : body['price']
			}

			products.append(product)

			resp.body = ujson.dumps({
				'products': product,
				'status': 'CREATED OK'
			})


			resp.status = falcon.HTTP_200

		except Exception as e:

			logger.error(e, exc_info=True)

			resp.body = ujson.dumps({"error": "connection error"})
			resp.status = falcon.HTTP_502


	def on_put_product(self, req, resp, product_id):
		
		try:
			logger.info("Performing put request...")

			body = req.context['request']

			product = [p for p in products if str(p['id']) == str(product_id)]

			if product == []:

				resp.body = ujson.dumps({'error': 'product not found.'})
				resp.status = falcon.HTTP_404

			else: 

				product[0]['name'] = body['name']
				product[0]['stock'] = body['stock']
				product[0]['price'] = body['price']

				resp.body = ujson.dumps({
					'products': product,
					'status': 'UPDATED OK'
				})

				resp.status = falcon.HTTP_200

		except Exception as e:

			logger.error(e, exc_info=True)

			resp.body = ujson.dumps({"error": e})
			resp.status = falcon.HTTP_502

	def on_delete_product(self, req, resp, product_id):

		try:
			logger.info("Performing delete request...")

			product = [p for p in products if str(p['id']) == str(product_id)]

			if product == []:

				resp.body = ujson.dumps({'error': 'product not found.'})
				resp.status = falcon.HTTP_404

			else:

				products.remove(product[0])

				resp.body = ujson.dumps({
					'products': product,
					'status': 'DELETED OK'
				})

			resp.status = falcon.HTTP_200

		except Exception as e:

			logger.error(e, exc_info=True)

			resp.body = ujson.dumps({"error": e})
			resp.status = falcon.HTTP_502

```

The code above shows different functions that correspond to certain HTTP methods for a products API. For example: `on_get_product`, `on_post_product`, `on_put_product`, `on_delete_product`, etc., are functions that implement business logic for creating, reading, updating, and deleting products.


Once the resource controller has been configured, we can then define a file called `app.py`, which will instantiate our product resource controller. 

```python
import falcon
import json_utils
from decouple import config
from product_resource import ProductResource


# Declare Falcon Middleware 
# RequireJSON will always make sure the application data is in JSON format
# JSONtranslator will translate the stream data from falcon into JSON format
api = falcon.API(middleware=[
			json_utils.RequireJSON(),
			json_utils.JSONtranslator(),
		])

# we define our resource here
product = ProductResource()

api.add_route('/products', product)
api.add_route('/products/{product_id}', product, suffix="product")

```

Note that we can define routes as needed using the `add_route` function. 

Lastly, for the API to function efficiently, we must add two middlewares:

`RequireJSON()` and `JSONtranslator`, these middlewares are used to process our json objects. Since Falcon processes request and response data as a stream of bytes, there is a need to perform some serialization to ensure that the data being sent and being serialized in json format; this is handled by `JSONtranslator`. On the otherhand, we must also validate that the request being accepted is in json format; this is handled by `RequireJSON()`


```python
import json
import falcon
import datetime
import decimal

# Middle ware classes for processing json objects


# This will read the stream from the request, then it will decode this data into json format
# If it cannot decode, it will return an TypeError

class JSONtranslator:
    def process_request(self, req, resp):
        """
        req.stream corresponds to the WSGI wsgi.input environ variable,
        and allows you to read bytes from the request body.
        See also: PEP 3333
        """
        if req.content_length in (None, 0):
            return

        body = req.stream.read()

        if not body:
            raise falcon.HTTPBadRequest(
                'Empty request body. A valid JSON document is required.'
            )
        try:
            # You can access the request data using req.context['request']
            req.context['request'] = json.loads(body.decode('utf-8'))

        except (ValueError, UnicodeDecodeError):
            raise falcon.HTTPError(
                falcon.HTTP_753,
                'Malformed JSON. Could not decode the request body.'
                'The JSON was incorrect or not encoded as UTF-8.'
            )

    def process_response(self, req, resp, resource, req_succeeded):
        if 'response' not in resp.context:
            return
        
        resp.body = json.dumps(
            resp.context['response'],
            default=json_serializer
        )

    def json_serializer(obj):
        if isinstance(obj, datetime.datetime):
            return str(obj)
        elif isinstance(obj, decimal.Decimal):
            return str(obj)

        raise TypeError('Cannot serialize {!r} (type {})'.format(obj, type(obj)))


class RequireJSON(object):

    def process_request(self, req, resp):
        if not req.client_accepts_json:
            raise falcon.HTTPNotAcceptable(
                'This API only supports responses encoded as JSON.',
                href='http://docs.examples.com/api/json')

        if req.method in ('POST', 'PUT'):
            if 'application/json' not in req.content_type:
                raise falcon.HTTPUnsupportedMediaType(
                    'This API only supports requests encoded as JSON.',
                    href='http://docs.examples.com/api/json')
```


There you have it. You have just completed setting up your Falcon API. :clap: :clap: :clap: 

#### Wrapping up 

Python Falcon is a simple framework that boasts to be blazing fast and highly reliable. It is also easily extensible which makes it one of the ideal choices for large scale microservices. 

For more details, you may visit my sample project. [https://github.com/eddrichjanzzen/python-falcon-sample](https://github.com/eddrichjanzzen/python-falcon-sample) 
