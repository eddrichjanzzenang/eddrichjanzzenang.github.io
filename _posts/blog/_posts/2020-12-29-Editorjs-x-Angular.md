---
title: 'Integrating Editor.js with Angular'
layout: blog-specific
author: eddrichjanzzen
date: 2020-12-29
category: blog
tags: 
- angular
- tech
description: 'An article that walks through how to integrate Editor.js into an Angular application'
---	

Writing or creating content has always been a crutial part of the web since its beginning. As the web continues to mature, the demand for dynamic, customizable, and flexibile text editors has evolved as well. Gone are the days of `<textarea>` where the content being written is static. Most modern text editors now follow the concept of [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) (What You See Is What You Get), where the content being edited within a form resembles its actual appreance when printed or displayed on screen. As a matter of fact, the open source community offers many free options that suit these needs. ![Angular](/assets/images/blog/angular-editorjs/angular-x-editorjs.png){:class="img-blog-right"}

In this article, we will be looking into an emerging Block-Styled editor, [Editor.js](https://editorjs.io/). We will then walkthough how this tool might be implemented in an Angular application. 

#### What is Editor.js? 

Editor.js is a Block-Styled editor, that uses `Blocks` as structural units. Unlike traditional text editors, Editor.js returns `Clean Data`. This means that instead of returning data in raw HTML-mark up, the output produced is a JSON formatted object for each `Block`. 

Instead of having data returned this way: 
```html
<section name="0ed1" class="section section--body section--first">
   <div class="section-divider">
      <hr class="section-divider">
   </div>
   <div class="section-content">
      <div class="section-inner sectionLayout--insetColumn">
         <h3 name="f8e8" class="graf graf--h3 graf--leading graf--title">
            <br>
         </h3>
         <p name="982b" class="graf graf--p graf-after--h3">
            The example of text that was written in <strong class="markup--strong markup--p-strong">one of popula</strong>r text editors.
         </p>
         <h3 name="c2ad" class="graf graf--h3 graf-after--p">
            With the header of course
         </h3>
         <p name="83d3" class="graf graf--p graf-after--h3">
            So what do we have?
         </p>
      </div>
   </div>
</section>
<section name="d1d2" class="section section--body">
  ...
</section>
```

The data is returned this way: 
```json
{
    "time" : 1550476186479,
    "blocks" : [
        {
            "type" : "paragraph",
            "data" : {
                "text" : "The example of text that was written in <b>one of popular</b> text editors."
            }
        },
        {
            "type" : "header",
            "data" : {
                "text" : "With the header of course",
                "level" : 2
            }
        },
        {
            "type" : "paragraph",
            "data" : {
                "text" : "So what do we have?"
            }
        }
    ],
    "version" : "2.8.1"
}
```

This makes it easier to sanitize, validate, process data on the backend. 

Another notable feature of Editor.js is extensibility and pluggability. Each `Block` in Editor.js is provided by a Plugin. This makes Editor.js a more lightweight library as you are installing only the set of tools that are required for your specific needs. For the purpose of this article, we will be utilizing the following commonly used `Blocks`:

1. [embed](https://github.com/editor-js/embed)
2. [header](https://github.com/editor-js/header)
3. [highlight](https://github.com/editor-js/highlight)
4. [list](https://github.com/editor-js/list)

You can also find a list of all available `Blocks` [here](https://github.com/editor-js). 

#### Integrating Editor.js with Angular

Before we proceed, this article assumes some basic knowledge of Angular. It also assumes that you have `Angular` and `npm`, already installed in your machine. For those who don't know what `Angular` or `npm` is, you may check it out [here](https://angular.io/), and [here](https://www.npmjs.com/). 

##### Step 1: Set up 

Create your angular app
```bash

$ ng new angular-editorjs-sample

```

cd into your angular app
```bash

$ cd angular-editorjs-sample

```

Install Editor.js, including some of the commonly used `Blocks`:
```bash

$ npm i @editorjs/editorjs --save
$ npm i @editorjs/header --save
$ npm i @editorjs/marker --save
$ npm i @editorjs/embed --save
$ npm i @editorjs/list --save

```

Install library `@ngneat/until-destroy` to handle component clean ups, and garbage collection
```bash

$ npm i @ngneat/until-destroy --save

```

##### Step 2: Create your Article Editor Component

Create your article-editor component
```bash

$ ng generate component article-editor

```

This should create a folder inside `app` called `article-editor` with the following files: 
```bash

▼ app
    ▼ article-editor
        article-editor.component.html
        article-editor.component.scss
        article-editor.component.spec.ts
        article-editor.component.ts
    ...

```
##### Step 2: Define the Editor.js configurations

*Creating external config file:* In the `article-editor` folder, create the following file: `article-editor.config.ts`

```bash

▼ article-editor
    ...
    article-editor.config.ts

```

*Adding external config file:* In the `article-editor.config.ts`, copy the following: 
```ts

import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';

export const editorjsConfig = {

  holder: 'editorjs',
  tools: {
    Marker :{
      class : Marker,
      shortcut : 'CMD+SHIFT+M'
    },
    header: {
      class: Header,
      inlineToolbar: [
        'link', 'bold', 'italic'
      ]
    },
    list: {
      class: List,
      inlineToolbar: [
        'link','bold'
      ]
    },
    embed : {
      class : Embed,
      inlineToolbar: false,
      config: {
        services: {
          youtube: true,
          coub: true
        }
      }
    }
  },
}

```

 `article-editor.config.ts` will contain all the configurations and settings for the different Plugins we want to extend to the editor. For example, the header plugin can be extended using the following configuration: 

 ```ts
 ...
     header: {
      class: Header,
      inlineToolbar: [
        'link', 'bold', 'italic'
      ]
    },
...
 ```

##### Step 3: Define the Editor.js Object Instance

*Defining the article-editor component logic:* Replace the code in `article-editor.component.ts`, with the following code snippet: 

```ts

import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith, debounceTime, skip } from 'rxjs/operators';
import { Observable } from 'rxjs';

import EditorJS from '@editorjs/editorjs';
import { editorjsConfig } from './article-editor.config';

@UntilDestroy()
@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

  editorData: any;
  editor: EditorJS;
  editorObserver: MutationObserver;

  constructor() { }

  ngOnInit(): void {
    
    this.editor = new EditorJS(editorjsConfig)
  
    this.detectEditorChanges().pipe(
      debounceTime(200),
      skip(1),
      untilDestroyed(this)
    ).subscribe(data=>{
      this.editor.save().then((outputData)=>{
        this.editorData =  JSON.stringify(outputData, null, 2);
      });
    });
  }

  saveEditorData() : void {
    this.editor.save().then((outputData) => {
      this.editorData =  JSON.stringify(outputData, null, 2);
    })
  }

  ngOnDestroy(): void {
    this.editorObserver.disconnect();
  }

  detectEditorChanges(): Observable <any> {

    return new Observable(observer => {

      const editorDom = document.querySelector('#editorjs');
      const config = { attributes: true, childList: true, subtree: true };

      this.editorObserver = new MutationObserver((mutation) => {
        observer.next(mutation);
      })

      this.editorObserver.observe(editorDom, config);

    })
  }
}

```

The code snippet above contains all the imports, functions, and set up needed to render Editor.js within the component. The code will be explained further below in the code walkthrough.


##### Step 4: Adding Markup

*Adding html*: In the `article-editor.component.html`, file copy the following mark up: 
```html

<div class="articleEditor">

  <div class="panelOne">
    <h2>Editor JS</h2>
    <div id="editorjs"></div>

    <button (click)="saveEditorData()">Save Article</button>
  </div>

  <div class="panelTwo">
    <h2>Clean Data</h2>
    <div class="articleDataContainer">
      <pre [innerHTML]="editorData"></pre>
    </div>
  </div>

</div>

```

Note here that `<div id="editorjs"></div>`, is where all the magic happens. This is what renders `Editor.js`. Without this `id="editorjs"`, the editor will not load. 

You will find the reference to `id="editorjs"` in the `holder` key, in `article-editor.config.ts`:
```ts

...
export const editorjsConfig = {
  holder: 'editorjs',
...

```

*Adding Styles:* In the `article-editor.component.scss` file, copy the following mark up: 
```scss

.articleEditor {
  background: rgb(233, 233, 233);
  height: 100%;
  padding: 3em;
  display: flex;
  font-family: 'Lato';
}

#editorjs {
  background: white;
  min-height: 700px;
}

button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

::ng-deep .ce-block__content,
::ng-deep .ce-toolbar__content {
    max-width: unset;
}

.panelOne {
  flex: 0 0 50%;
}

.panelTwo {
  flex: 1;
  margin: 0 3em 0 3em;
}

.articleDataContainer {
  background: white;
  min-height: 700px;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

pre {
  white-space: pre-wrap;
  word-break: keep-all
}

```

Note that we can use `::ng-deep` to overwrite Editor.js specific styles, to make the editor span the entire width of the container.
```scss

::ng-deep .ce-block__content,
::ng-deep .ce-toolbar__content {
    max-width: unset;
}

```

##### Step 5: Adding article-editor to app-component

Replace the contents in the `app.component.html` with the following snippet:
```html

<app-article-editor></app-article-editor>

```

##### Step 5: Test your app

```bash

$ ng serve --open

```

#### Code Walkthrough: 
##### Mutation Observer

Angular comes with a built-in detection that can keep track of any changes on `input` fields. Please see [FormControls](https://angular.io/api/forms/FormControl), and [ReactiveForms](https://angular.io/guide/reactive-forms). This is feature comes in handy when dealing with `<textarea>`, `<input>`, or `<form>` elements. However for this example, we are not able to utilize this feature out of the box.

The way Editor.js handles adding content is by appending a new `<div>` element to the DOM whenever new content data is written. So in order for the application to detect changes, we can instead make use of a `MutationObserver` to emit an event every time a new element or `<div>` is added to the DOM.  

*What is a MutationObeserver?* 

> The [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) is an interface provides the ability to watch for changes being made to the DOM tree. 


The following code shows how the `MutationObserver` is being used:

```ts

detectEditorChanges(): Observable <any> {
    return new Observable(observer => {
      const editorDom = document.querySelector('#editorjs');
      const config = { attributes: true, childList: true, subtree: true };

      this.editorObserver = new MutationObserver((mutation) => {
        observer.next(mutation);
      })

      this.editorObserver.observe(editorDom, config);
    })
}

```

In the following code snippet, we wrap the output of the `MutationObserver` in an `Observable`. This allows the application to subscribe to an event emitted, every time the user types new content into the editor. Please see the following code: 

```ts

ngOnInit(): void {

    this.editor = new EditorJS(editorjsConfig)

    this.detectEditorChanges().pipe(
        debounceTime(200),
        skip(1),
        untilDestroyed(this)
    ).subscribe(data=>{
        this.editor.save().then((outputData)=>{
        this.editorData =  JSON.stringify(outputData, null, 2);
        });
    });
}

```

When the article-editor component is initialized, we immediately set up a new subscription to detect new changes and emit the clean data output. We then assign the `outputData` to the `editorData`. This way we are able to load data from the editor dynamically as the input from the editor changes. 


#### The Final Product

![Angular](/assets/images/angular-editorjs/editorjs.gif){:class="img-blog"}

There you have it. You have successfully integrated `Editor.js` with `Angular`. :clap: :clap: :clap: 

For more details, you may visit the sample project. [https://github.com/eddrichjanzzen/angular-editorjs-sample](https://github.com/eddrichjanzzen/angular-editorjs-sample) 
































