---
title: Color Scale using D3.js and Angular
layout: blog-specific
author: eddrichjanzzen
date: 2020-08-16
category: blog
tags: 
- tech
- angular
description: A Color scale component implemented using D3.js and Angular. This is complete with example code and usage steps. 
---

#### Data Visualization

As business needs continue to evolve, being able to visualize data is of paramount importance. More than just presenting the numbers to our users; we also need to make it easy for them to understand what those numbers mean. Data visualization is a vast field that deals with making data easier to understand. There are numerous ways to present data such as bar graphs, line charts, and pie charts. However, these methods can sometimes be quite limited. 

For example: What if the data can be better represented using a color spectrum? 

In this article, I have used [D3.js](https://d3js.org/) and [Angular](https://angular.io/) to create a simple reusable component for a Color Scale. Let's dive in! 

#### D3.js and Angular

[D3.js](https://d3js.org/) or Data Driven Documents is a Javascript library for manipulating documents based on data. In simple terms, D3 is a library that helps you bring your data to life. With D3, creating simple yet amazing visualizations are possible with use of a browser. 

[Angular](https://angular.io/) is a platform built by Google for building mobile and desktop web applications. It is framework and development platform for creating efficient and sophisticated single-page apps.

Combining D3 with Angular, we are able to take advantage of a powerful visualization tool and the reusability of components. Lets jump in! 

#### Color Scale Component
 
##### Set up and Installation:
Install the following dependencies: `d3` and `ng-color-scale`

```bash

$ npm i d3
$ npm i ng-color-scale

```

In your `app.module.ts`, add the following:

```js

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NgColorScaleModule
import { NgColorScaleModule } from 'ng-color-scale';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // NgcolorScaleModule

    NgcolorScaleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


##### Usage: 
In your `app.component.html` add the following:

Example 1:
```html

<h1>Gender Bias</h1>

<app-color-scale
	[data]="-0.799"
	[leftLabel]="'Feminine'"
	[rightLabel]="'Masculine'"
	[middleLabel]="'Neutral'"
	[minVal]="-1"
	[maxVal]="1"
	[colorList]="['#FF6347', '#D53E4F','#090979','#0000FF']"
	[displayMeta]="'Your article is '+ '<b>Feminine</b>'"
>
</app-color-scale>  

```

Output:
![Gender](/assets/images/blog/gender-bias.png){:class="img-blog"}

Example 2:
```html

<h1>Sentiment Analysis</h1>
<app-color-scale
	[data]="0.55"
	[leftLabel]="'Negative'"
	[rightLabel]="'Positive'"
	[middleLabel]="'Neutral'"
	[minVal]="-1"
	[maxVal]="1"
	[colorList]="['#9E0142', '#D53E4F',
	                    '#F46D43', '#FDAE61',
	                    '#FEE08B', '#FFFFBF',
	                    '#E6F598', '#ABDDA4', 
	                    '#66C2A5', '#6AA84F',
	                    '#38761D']"
	[hideAxis]="true"
	[displayMeta]="'Your sentiment score is '+ '<b>Positive</b>'"
>
</app-color-scale>

```

Output
![Sentiment](/assets/images/blog/sentiment-analysis.png){:class="img-blog"}


#### Wrapping up

There you have it. You have successfully added your custom color scale. :clap: :clap: :clap: 

For information and a more detailed documentation, you can visit the npm package at: [https://www.npmjs.com/package/ng-color-scale](https://www.npmjs.com/package/ng-color-scale)















