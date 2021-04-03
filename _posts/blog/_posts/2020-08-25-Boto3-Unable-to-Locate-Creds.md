---
title: 'AWS: boto3 "Unable to locate credentials" with Docker'
layout: blog-specific
author: eddrichjanzzen
date: 2020-08-25
category: blog
tags: 
- tech
- aws
- python
description: 'An article that describes the fix for boto3: botocore.exceptions.NoCredentialsError Unable to locate credentials with Docker images.'
---	

#### Boto3: Unable to locate credentials

Recently I've been working on a Dockerized Python application that connects to AWS resources using the [boto3](https://pypi.org/project/boto3) library. I stumbled upon an error where the app could not find the aws credentials within the docker container. 

```bash

botocore.exceptions.NoCredentialsError: Unable to locate credentials

```

Later on, I realized that the problem lies in the fact that the docker is unable locate the credentials from the `.aws` folder. As much as docker is concerned, there are no credentials to be found within the running container.

#### Solution

The solution I've found to is add the configuration as follows:


If you are using `docker run`: 

```bash

 docker run -v ~/.aws/:/root/.aws:ro your_image -e AWS_PROFILE=default

```


If you are using a `docker-compose.yml` file, 

```yaml

version: '3'

services:
  service-name:
    image: docker-image-name:latest
    environment:
      - AWS_PROFILE=default
    volumes:
      - ~/.aws/:/root/.aws:ro

```

#### Explanation: 

`~/.aws/:/root/.aws:ro` is a volume definition that mounts the `.aws` folder of your local machine to the root of our docker container. `:ro` stands for a readonly volume, and we must make the volume readonly so that we are sure the credentials cannot be modified. 

We set our `environment` as `AWS_PROFILE=default` so that boto3 will know to read the configuration for the `default` environment. For multiple environments you can configure `AWS_PROFILE=<your environment here>`


I hope this article will be of help to anyone who encounters a similar issue. :smile: :thumbsup: 
















