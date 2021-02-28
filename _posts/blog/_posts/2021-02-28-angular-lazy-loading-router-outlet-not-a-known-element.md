---
title: "Angular Lazy Loading: 'router-outlet' is not a known element"
layout: blog-specific
author: eddrichjanzzen
date: 2021-02-28
category: blog
tags: 
- angular
- tech
description: "An article that describes the fix for an error with lazy loaded modules in angular: 'router-outlet' is not a known element.."
---	

While working on lazy loaded modules in angular 10, I ran into issues with adding components that use `<router-outlet></router-outlet>` in the template file. The compiler throws the error below even if the `RouterModule` is already defined in the `module.ts` imports: 

```bash

Error: src/app/modules/authentication/authentication.component.html:1:1 - error NG8001: 'router-outlet' is not a known element:
1. If 'router-outlet' is an Angular component, then verify that it is part of this module.
2. If 'router-outlet' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.

```


#### Solution

There are two things one must remember when lazy loading modules that use `<router-outlet></router-outlet>`. 

###### 1. There is no need to re-import the module class in the `module.ts`, if it is lazy loaded. Angular already knows to load these modules by default.

`main-routing.module.ts`
```typescript

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
...

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: AuthenticationComponent,
                loadChildren: () => import('./../authentication/authentication.module').then(m => m.AuthenticationModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }

```

`main.module.ts`
```typescript

...
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        //xxx AuthenticationModule xxx <----- There is no need to import the module here
        MainRoutingModule
    ]
})
export class MainModule { }

```

###### 2. The component using `<router-outlet></router-outlet>` must be added in the  `module.ts` declarations list

`main.component.html`

```html

<router-outlet></router-outlet>

```

`main.module.ts`
```typescript

import { MainComponent } from './main.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        MainComponent // <----- DON'T FORGET TO DECLARE THIS
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        MainRoutingModule
    ]
})
export class MainModule { }

```

I hope this article will be of help to anyone who encounters a similar issue. :smile: :thumbsup: 






























