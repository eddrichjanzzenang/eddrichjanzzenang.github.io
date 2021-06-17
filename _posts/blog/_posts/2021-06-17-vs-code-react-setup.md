---
title: "Setting up Visual Studio Code for Developing React Applications"
layout: blog-specific
author: eddrichjanzzen
date: 2021-06-17
category: blog
tags: 
- tech
- react
description: "An article that shows how to customize VS code to improve productivity with React"
---	

Recently, I've been looking into learning [React](https://reactjs.org/). React is javascript library developed and maintained by Facebook. ![React](/assets/images/blog/vs-code-react/vs-code-react.png){:class="img-blog-right width-40"} It is mainly used to create user interfaces, but can also be used to build mobile applications. 

In this article, I will be sharing some of the configurations and plugins for [Visual Studio Code](https://code.visualstudio.com/) to make developing applications in React way faster.

#### 1. Emmet for React
[Emmet](https://emmet.io/) is a plugin for text editors to improve the html css workflow. It comes with a series of shortcuts to automatically generate html and css.

Javascipt XML or [JSX](https://www.w3schools.com/react/react_jsx.asp#:~:text=JSX%20stands%20for%20JavaScript%20XML,and%20add%20HTML%20in%20React.) is a syntax extension to Javascript, which mainly used in developing components in React. Although VS code comes with Emmet out of the box, it does not immediately support JSX.


The good news is, you can enable Emmet for React using following steps: 
>
##### 1. Go to the settings page in VS Code 
>
![settings](/assets/images/blog/vs-code-react/settings-page.png){:class="img-blog"}

>
##### 2. Go to the `Workspace Settings` tab
>
![settings](/assets/images/blog/vs-code-react/workspace-settings.png){:class="img-blog"}

>
##### 3. Under `Extensions` look for `Emmet`
>
![settings](/assets/images/blog/vs-code-react/emmet-boxed.png){:class="img-blog"}

>
##### 4. Click on `"Edit in settings.json"`
>
![settings](/assets/images/blog/vs-code-react/settings.png){:class="img-blog"}

>
##### 5. Add the following lines of code to `"settings.json"`

```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

  Success! Emmet should now be working!!! :raised_hands:


#### 2. Prettier Plugin
[Prettier](https://prettier.io/docs/en/why-prettier.html) is an opinionated code formatter that enforces consistent style by parsing the code. It is easy to adopt; has low overhead; and saves time and energy on code reviews.


To install Prettier you can follow these steps: 

>
##### 1. In the side panel click on the Extensions icon
>
![settings](/assets/images/blog/vs-code-react/extensions.png){:class="img-blog"}

>
##### 2. In the search bar, search for `Prettier`
>
![settings](/assets/images/blog/vs-code-react/search-prettier.png){:class="img-blog"}

>
##### 3. Install `Pretter`
>
![settings](/assets/images/blog/vs-code-react/install-prettier.png){:class="img-blog"}

>
##### 4. To verify prettier is installed, you should see the following on the bottom of the code editor
>
![settings](/assets/images/blog/vs-code-react/prettier-verify.png){:class="img-blog"}


  Success! Prettier has now been installed!! :raised_hands: :clap:































