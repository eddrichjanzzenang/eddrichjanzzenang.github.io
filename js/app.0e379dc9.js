(function(t){function e(e){for(var r,o,c=e[0],u=e[1],s=e[2],l=0,f=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},o={app:0},a={app:0},i=[];function c(t){return u.p+"js/"+({}[t]||t)+"."+{"chunk-28241050":"a062e520","chunk-2d0ac1cc":"1cc9b914","chunk-2d210c47":"76be9063","chunk-2d2138f6":"b3091a29"}[t]+".js"}function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n={"chunk-28241050":1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=new Promise((function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-28241050":"550f13cd","chunk-2d0ac1cc":"31d6cfe0","chunk-2d210c47":"31d6cfe0","chunk-2d2138f6":"31d6cfe0"}[t]+".css",a=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return e()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){s=f[c],l=s.getAttribute("data-href");if(l===r||l===a)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var r=e&&e.target&&e.target.src||a,i=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[t],d.parentNode.removeChild(d),n(i)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[t]=0})));var r=a[t];if(0!==r)if(r)e.push(r[2]);else{var i=new Promise((function(e,n){r=a[t]=[e,n]}));e.push(r[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(t);var f=new Error;s=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[t]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/",u.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var f=0;f<s.length;f++)e(s[f]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},2044:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Navigation",{attrs:{orientation:"nav-top"}}),n("div",{staticClass:"content-wrapper"},[n("router-view")],1),n("Footer")],1)},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"nav"}},[n("nav",[n("div",{class:t.orientation},["nav-top"===t.orientation?n("div",[n("div",{staticClass:"hamburger",on:{click:t.open}},[n("div",{staticClass:"line"}),n("div",{staticClass:"line"}),n("div",{staticClass:"line"})])]):t._e(),n("ul",{class:t.menu},[n("li",[n("router-link",{attrs:{to:"/"}},[t._v("About")])],1),n("li",[n("router-link",{attrs:{to:"/projects"}},[t._v("Projects")])],1),n("li",[n("router-link",{attrs:{to:"/posts"}},[t._v("Posts")])],1),t._m(0),n("li",[n("router-link",{attrs:{to:"/contact"}},[t._v("Contact")])],1)])])])])},c=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("a",{attrs:{href:"https://github.com/eddrichjanzzenang",target:"_blank"}},[t._v("GitHub")])])}],u={name:"navigation",props:{orientation:String},data:function(){return{menu:"menu"}},methods:{open:function(){"menu"==this.menu?this.menu="menu open":this.menu="menu"}}},s=u,l=(n("9028"),n("2877")),f=Object(l["a"])(s,i,c,!1,null,null,null),d=f.exports,p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"footer"}},[r("div",{staticClass:"mini"},[r("Navigation",{attrs:{orientation:"nav-bottom"}}),r("img",{attrs:{src:n("a6d3"),alt:""}}),t._m(0)],1)])},h=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("Developed by "),n("a",{attrs:{href:"https://github.com/eddrichjanzzenang"}},[t._v("Eddrich Janzzen Ang")]),t._v(" made with "),n("a",{attrs:{href:"https://vuejs.org/"}},[t._v("Vue.js")])])}],v={name:"footer",components:{Navigation:d}},m=v,g=(n("760c"),Object(l["a"])(m,p,h,!1,null,null,null)),b=g.exports,_={name:"app",components:{Navigation:d,Footer:b}},y=_,k=(n("034f"),Object(l["a"])(y,o,a,!1,null,null,null)),j=k.exports,w=n("8c4f");r["a"].use(w["a"]);var E=new w["a"]({mode:"history",base:"/",routes:[{path:"/",name:"about",component:function(){return n.e("chunk-28241050").then(n.bind(null,"f820"))}},{path:"/contact",name:"contact",component:function(){return n.e("chunk-2d210c47").then(n.bind(null,"b8fa"))}},{path:"/projects",name:"projects",component:function(){return n.e("chunk-2d2138f6").then(n.bind(null,"acca"))}},{path:"/posts",name:"posts",component:function(){return n.e("chunk-2d0ac1cc").then(n.bind(null,"17c3"))}}]});r["a"].config.productionTip=!1,n("e382"),n("56e5"),n("d971"),new r["a"]({router:E,render:function(t){return t(j)}}).$mount("#app")},"56e5":function(t,e,n){},"64a9":function(t,e,n){},"760c":function(t,e,n){"use strict";var r=n("b675"),o=n.n(r);o.a},9028:function(t,e,n){"use strict";var r=n("2044"),o=n.n(r);o.a},a6d3:function(t,e,n){t.exports=n.p+"img/me.005c76c2.jpg"},b675:function(t,e,n){},d971:function(t,e,n){},e382:function(t,e,n){}});
//# sourceMappingURL=app.0e379dc9.js.map