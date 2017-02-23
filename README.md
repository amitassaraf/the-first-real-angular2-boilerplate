
The First Real Angular 2 Boilerplate
=
A simple, complete, Angular 2 & Flask boilerplate featuring Sass, Pug, MaterializeCSS, JQuery, BassCSS, TypeScript, Webpack 2, Gunicorn/Tornado with LiveReload

[![Node version](https://img.shields.io/node/v/tfra2bp.svg?style=flat)](http://nodejs.org/download/)  [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/amitassaraf/the-first-real-angular2-boilerplate/issues) [![Join the chat at https://gitter.im/amitassaraf/The-First-Real-Angular-2-Boilerplate](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/The-First-Real-Angular-2-Boilerplate/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


:fire:
**The first real and simple boilerplate that will make you finally understand Angular 2**
:fire:

------

Features

 - Packed with the latest version of [Angular 2](https://angular.io)
 - [Webpack 2](https://webpack.js.org) with great plugins such as LiveReload and HtmlWebpackIncludeAssetsPlugin
 - Easy inclusion of external JS/CSS libraries
 - [Sass](http://sass-lang.com), [Pug](https://pugjs.org), [TS](https://www.typescriptlang.org)
 - Ready to be run using Gunicorn or Tornado
 - A simple Flask backend
 - Simple and elegant naming & placing conversions
 - Packed with [MaterializeCSS](http://materializecss.com), BassCSS, JQuery

> Tested with NodeJS version 7.4.0 (NPM version 4.0.5)

Quick Start
--
> Clone/Download the repo

```bash
// clone our repo
$ git clone https://github.com/amitassaraf/the-first-real-angular2-boilerplate.git my-app

// change directory to your app
$ cd my-app
$ cd src/frontend

// install the dependencies with npm
$ npm install

// start the server
$ npm start

// Enter the backend folder
$ cd ../tfra2bpflask

// start the flask server
$ sudo sh Profile
// or (on Windows)
$ python server.py
```

go to http://localhost:8000 in your browser.

![When running npm start](http://i64.tinypic.com/nvnouv.png)

````bash
# For production you should run:
$ npm run build
````

FAQ
-

When you want to add an external library all you need to do is drop it inside ```frontend/externals/libs``` then add the following line to ```libs.ts```:
> declare var [LibraryExportName]: any;

Examples are available in the boilerplate.

----
When you want to add a library that uses ```scss``` you should put the ```scss``` file inside ```frontend/externals``` then import it inside ```index.scss```
> @import "../../../externals/libs/materialize/sass/materialize";

----
File structure tree:
```bash
src
---> frontend
     ---> externals
          ---> libs # Here you place all external JS/CSS libs
               ...
          ...
     ---> src
          ---> app
               ---> components # Folder for all components
                    ---> home
                         home.pug # No more .component convention!
                         home.scss
                         home.ts
                    ---> about # Each component gets a folder with a pug, sass, ts files
                         about.pug
                         about.scss
                         about.ts
                    app.pug
                    app.scss
                    app.ts
               ---> services # Here you can place angular services
                    api_service.ts # No more .service.ts convension
                    ...
               ...
          package.json
          ....
```


----------


TypeScript
-
> To take full advantage of TypeScript with autocomplete you would have to use an editor with the correct TypeScript plugins.


----------
License
-
> MIT

**Proudly created by Amit Assaraf & Ran Amos**

![The boilerplate main page](http://i66.tinypic.com/2z8xq0y.png)