# jm-cli
> a CLI tool for jumore FE team
  
## Install:

### from npm
```bash
$ npm i -g jm-cli
```

### from github(latest)

```bash
$ git clone https://github.com/jm-team/jm-cli.git
$ cd jm-cli
$ npm link
```

## Usage
Init an angularjs project that build with webpack

```bash
$ jm init ng ng-demo 
$ cd ng-demo
```
Vue2 project
```bash
$ jm init vue vue-demo
$ cd vue-demo
```
install package
	
```bash
$ jm install 
```
or
	
```bash
$ jm i
```

dev build

```bash
$ jm dev
```

production build

```bash
$ jm build
```
open browser

```
http://localhost:8081
```

```bash

  Usage: jm <command> [options]


  Commands:

    init        initialize project, you can choose the framework with AngularJS or Vue2
    install|i   Install Package
    dev         dev build
    build       production build
    seed        publish seed
    jsdoc       generator jsdoc
    changelog   generator changelog.md
    author      generator authors.md
    site        push gh-pages
    ng:page     generator new page

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -c, --config [path]  config file path

```


## License 

(The MIT License)

Copyright (c) 2016 iceli &lt;woticeli@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
