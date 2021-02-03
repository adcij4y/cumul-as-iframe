const static = require('node-static');
const http = require('http');
const port = 8080;

const file = new static.Server('./public', { cache: '0', etag: false, maxAge: '0', setHeaders: setCustomCacheControl });

function setCustomCacheControl (res, path) {
    if (serveStatic.mime.lookup(path) === 'text/html') {
      // Custom Cache-Control for all static files
      res.setHeader('Cache-Control', 'public, max-age=0')
    }
  }

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(port);
console.log(`Listening on port ${port}`);