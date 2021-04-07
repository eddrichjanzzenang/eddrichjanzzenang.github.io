---
title: "Jekyll: index.html not rendering in page, Index of /page_name/"
layout: blog-specific
author: eddrichjanzzen
date: 2021-04-03
category: blog
tags: 
- tech
- jekyll
description: "An article shows a possible reason why the index.html page in jekyll isn't rendered"
---	

[Jekyll](https://jekyllrb.com/) is an amazing tool for building static websites. What I love about Jekyll is that you can easily deploy a simple website without the need for a database. ![jekyll](/assets/images/blog/jekyll.png){:class="img-blog-right"} You can also host it for free using [Github Pages](https://pages.github.com/) which makes process way more convenient.

Recently I've found the time to restructure my personal webpage built with Jekyll.

While restructuring the `pages` directory, I ran into an issue where the page would return `Index of /posts/` instead of the page specified as the `index`. 

![Index](/assets/images/blog/index-of-posts.png){:class="img-blog"}

After an hour or two of debugging, I found that the issue had to do with how Jekyll reads [front matter](https://jekyllrb.com/docs/front-matter/).

```html
<!-- Accidentally added comment here -->
---
layout: post-layout
title: Lastest Posts
order: 3
permalink: /posts/
pagination:
  enabled: true
  collection: posts
  permalink: /:num/
  title: Latest Posts
---

```

Apparently, adding an extra line above the front matter, eg. `empty line` or `comment` or  `space` caused Jekyll to skip the file and not include it in the page compilation. A possible reason for this could be because Jekyll tries to look for the `---` in the first line of the `html`. If the `---` is not found the file is skipped. 

#### Solution

Removing all extra lines above the front matter resolved the issue. 

```html
---
layout: post-layout
title: Lastest Posts
order: 3
permalink: /posts/
pagination:
  enabled: true
  collection: posts
  permalink: /:num/
  title: Latest Posts
---

```
#### TLDR;

When working on a Jekyll project, make sure to remove any trailing characters or spaces at the beginning of your `html` file and before the front matter.  

I hope this article will be of help to anyone who encounters a similar issue. :smile: :thumbsup: 






























