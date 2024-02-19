const html = require('http');
const url = require('url');
const process = require('process');
const recordManager = require('./modules/record_manager.js');
const messages = require('./lang/en/user/user_msg');

const port = process.env.PORT || 3000;

const GET = 'GET';
const POST = 'POST';
const endpoint = '/api/definitions/';
let reqCount = 0;
const records = new recordManager();
const msg = new messages();

const server = html.createServer((req, res) => {
  
  res.writeHead(200, {'Content-Type': 'text/plain',
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': '*'});
  if (req.method === GET) {
    reqCount++;
    const query = url.parse(req.url, true).query;
    if (query.word) {
      res.write(records.getRecord(query.word));
    } else {
      res.write(msg.error());
    }
    res.end();
    
  }
  if (req.method === POST && req.url === endpoint) {
    reqCount++;
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      if (data.word && data.definition) {
        res.end(msg.requestCount(reqCount) + ' ' + records.addRecord(data.word, data.definition));
      } else {
        res.end(msg.error());
      }
    });
    
  }
  //res.end(msg.error());
  
});

server.listen(port, () => {
  console.log('Server is listening on port ' + port);
});