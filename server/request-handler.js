
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var exports = module.exports = {}; 

exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  var messages = [
    {
      text: 'Hello', 
      username: 'carl', 
      objectID: 1
    }
  ];
  
  switch (request.method) {
    case 'GET':
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results: messages}));

      break;

    case 'POST':
      response.writeHead(201, headers);
      var body = '';
      request.on('data', function(chunk) {
        body += chunk; 
      });
      messages.push(body); 
      console.log('BODY', body); 
      response.end(JSON.stringify(body)); 
      break;

    case 'OPTIONS':
      response.writeHead(204, null, headers);
      response.end();
      break;

    default: 
      response.writeHead(404, headers); 
      response.end();

  }

  /* .writeHead() tells our server what HTTP status code to send back */
};

