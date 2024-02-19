// Import required modules and variables
const html = require('http');
const url = require('url');
const process = require('process');
const helper = require('./modules/dictionaryHelper.js');
const messages = require('./lang/en/user/messages.js');
const port = process.env.PORT || 3000;
const endpoint = '/api/definitions/';
const words = new helper();
const msg = new messages();
let counter = 0;

// Creating an HTTP server instance
const server = html.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*'});
  if (req.method === 'GET') { // Handling GET requests
    counter++;
    const query = url.parse(req.url, true).query;
    if (query.word) {
      res.write(words.getWord(query.word));
    } else {
      res.write(msg.error());
    }
    res.end();
  }

  if (req.method === 'POST' && req.url === endpoint) { // Handling POST requests to add new words + definitions
    counter++;
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => { // Processing request body after it's fully received
      const data = JSON.parse(body);
      if (data.word && data.definition) {
        res.end(msg.requestCount(counter) + ' ' + words.addWord(data.word, data.definition));
      } else {
        res.end(msg.error());
      }
    }); 
  }
});

server.listen(port, () => {
  console.log('Server is listening on port ' + port);
});