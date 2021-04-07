---
title: "Terraform: Error deleting S3 notification configuration"
layout: blog-specific
author: eddrichjanzzen
date: 2021-03-31
category: blog
tags: 
- tech
- aws
- terraform
description: "An article that describes fix and a possible preventive measure against an error on deleting S3 notification configuration when using terraform "
---	

Recently I've been working on project that uses [Terraform](https://www.terraform.io/) to provision different cloud resources like Dynamodb, S3, and Lambda Functions in [AWS](https://aws.amazon.com/). I ran into an issue where calling `terraform destroy` would produce the following error. 

```bash

Error deleting S3 notification configuration: OperationAborted: A conflicting conditional operation is currently in progress against this resource. Please try again.
	status code: 409, request id: W080JFW9XFESM4VE, host id: XXXXXXXXXX+WuqFetNLnzZ7T1oTXV0tzad4lCBQNWG5oxKD+hxocPXd2mpjYBnS1veeI=

```

The error above states that there is a conflicting conditional that prevents the deletion of the S3 bucket resource. 

Initial research led me to an article by AWS stating that the issue could be due to eventual consistency. It states that: "Because Amazon S3 is a large distributed system, changes like deleting a bucket can take time to become eventually consistent across all AWS Regions. ... Until the bucket is completely deleted by Amazon S3, you can't use the same bucket name. However, when the bucket is deleted and the name is available, other accounts can use the bucket name." 

#### Solution

To solve this issue, I found that appending a random string after the bucket name works. Here's how: 

##### Step 1:
Add a random string generator using the `random_string` resource of terraform

```tf

# terraform built in - random string generator
resource "random_string" "id" {
  length = 5
  special = false
  upper = false
}

```

For this example we specify a length of 5, and no special or upper case characters.

##### Step 2:
Define a your S3 bucket resource appending the result of the random string generator as follows: 

```tf

# S3 Bucket for new Documents
resource "aws_s3_bucket" "new_documents" {
  bucket = "my-documents-bucket-${random_string.id.result}"
}

```

This will produce a unique bucket following pattern everytime the bucket is created: 
```bash
"my-documents-bucket-abcde"
"my-documents-bucket-rando"
"my-documents-bucket-zcgsa"
```


I hope this article will be of help to anyone who encounters a similar issue. :smile: :thumbsup: 






























