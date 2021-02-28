---
title: 'Django urls UUID 404 page not found'
layout: blog-specific
author: eddrichjanzzen
date: 2021-02-27
category: blog
tags: 
- python
- tech
description: 'An article that describes a possible fix for 404 page not found in urls when using UUIDs as the primary key identifier'
---	

Recently I've been working on a simple api that uses [Django Rest Framework](https://www.django-rest-framework.org/). Instead of using integer ids as the primary key identifier, UUIDs are used. The advantage of this approach is to prevent enumeration attacks where the primary key is easily guessable. In addition to this, using UUIDs also guarantees a unique identifier across all systems. 

In Django, we are able to define a path to accept a UUID as follows:

urls.py
```python
from django.urls import path, re_path
from tasks.views import api_root_view, task_view, user_view 
from django.conf.urls import url

urlpatterns = [
    path('tasks/<uuid:pk>', task_view.TaskDetail.as_view()),
    ...
]

```

However, I found that the approach above will only work if the UUID supplied matches the specific pattern. This means that supplying an invalid UUID; lets say a UUID that's missing a few characters will always throw a 404 page and will never reach the view. 

##### Original

request: 
```bash

GET http://localhost:8000/tasks/7cd6fae8-2835-4dac-b44b-53326af162d3

```

response
```json
{
    "success": true,
    "data": {
        "id": "7cd6fae8-2835-4dac-b44b-53326af162d3",
        "title": "Feed the dogs",
        "description": "Remember to feed the dogs at 8AM",
        "deadline": "2021-02-23T16:37:37Z",
        "created_date": "2021-02-27T05:25:35.579628Z",
        "updated_date": "2021-02-27T05:25:35.579688Z",
        "completed": false
    }
}
```

##### Missing few characters

request:
```

GET http://localhost:8000/tasks/7cd6fae8-4dac-b-53326a3

```

response: 
```

404 Page not found

```


#### Solution

To solve this problem, we can instead make use of `re_path`, as follows

```python
from django.urls import path, re_path
from tasks.views import api_root_view, task_view, user_view 
from django.conf.urls import url

urlpatterns = [
    # accept match any regEx after 'task/'
    re_path(r'^task\/(?P<pk>.+)$', task_view.TaskDetail.as_view()),
]

```

In this example, we can match any regEx after `tasks/` with the `pk`, so that regardless whether the UUID supplied is invalid, the request would still hit the view, and will respond with details not found, instead of a the 404 page.

##### Original

request:
```bash

GET http://localhost:8000/tasks/7cd6fae8-2835-4dac-b44b-53326af162d3

```

response:
```json
{
    "success": true,
    "data": {
        "id": "7cd6fae8-2835-4dac-b44b-53326af162d3",
        "title": "Feed the dogs",
        "description": "Remember to feed the dogs at 8AM",
        "deadline": "2021-02-23T16:37:37Z",
        "created_date": "2021-02-27T05:25:35.579628Z",
        "updated_date": "2021-02-27T05:25:35.579688Z",
        "completed": false
    }
}
```

##### Missing few characters

request:
```bash

GET http://localhost:8000/tasks/7cd6fae8-2835-4dac-b-53326a3

```

response: 
```json

{
    "detail": "Not found."
}

```

I hope this article will be of help to anyone who encounters a similar issue. :smile: :thumbsup: 






























