const http = require('http');
const routes = require('./routes');
const { URL } = require('url');
const bodyParser = require('./helpers/bodyParsed');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`https://localhost:3000${request.url}`);
  console.log(`Request method: ${request.method} | EndPoint: ${request.url}` );

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndPoint = pathname.split('/').filter(Boolean); // removo a string vazia

  if (splitEndPoint.length > 1) {
    pathname = `/${splitEndPoint[0]}/:id`;
    id = splitEndPoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));
  
  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams) // tranformando as querys num objeto js
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    };
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }

});

server.listen(3000, () => console.log('Server started at https://localhost:3000'));
