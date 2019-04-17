# koa2-cors

[![NPM version][npm-image]][npm-url]
[![Node version][node-version-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Code coverage][codecov-image]][codecov-url]
[![NPM download][npm-download-image]][npm-url]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## install

> 要求 Node 版本不低于 7.6.0

```bash
npm install --save koa2-cors
```

## 使用方式

```js
var Koa = require("koa");
var cors = require("koa2-cors");

var app = new Koa();
app.use(cors());
```

## Options 参数

### origin/请求源地址

用于配置 **Access-Control-Allow-Origin** 头. 可以是一个函数，其第一个参数为`ctx`

### exposeHeaders

接受逗号分隔的数组，用于设置 **Access-Control-Expose-Headers**头

### maxAge

用于设置 **Access-Control-Max-Age** CORS header.

### credentials

布尔值，用于配置 **Access-Control-Allow-Credentials** CORS header.

### allowMethods

用于配置 **Access-Control-Allow-Methods** CORS header. 默认值为 `['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']`.

### allowHeaders

Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited array . If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.

```js
var Koa = require('koa');
var cors = require('koa2-cors');

var app = new Koa();
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
...
```

[More details about CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

[npm-image]: https://img.shields.io/npm/v/koa2-cors.svg
[npm-download-image]: https://img.shields.io/npm/dm/koa2-cors.svg
[node-version-image]: https://img.shields.io/node/v/koa2-cors.svg
[npm-url]: https://www.npmjs.com/package/koa2-cors
[travis-image]: https://api.travis-ci.org/zadzbw/koa2-cors.svg?branch=master
[travis-url]: https://travis-ci.org/zadzbw/koa2-cors
[codecov-image]: https://codecov.io/gh/zadzbw/koa2-cors/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/zadzbw/koa2-cors
