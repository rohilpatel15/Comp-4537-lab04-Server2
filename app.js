const http = require('http');
const url = require('url');

const endpoint = "/api/definitions";

let dictionary = [];

http.createServer(function(req, res) {
    res.writeHead(200, { 
        'Content-Type': 'application/json',
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST"
    });

    console.log(req.headers);

    if (req.method === POST && req.url === endpoint) {
        let body = '';
        req.on('data', function (chunk) {
            if (chunk !== null) {
                body += chunk;
            }
        });

        // CHECK THIS FUNCTION
        req.on('end', function() {
            const { word, definition } = JSON.parse(body);
            const existingEntry = dictionary.find(entry => entry.word === word);

            if (existingEntry) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: `Word '${word}' already exists.` }));
            }

            dictionary.push({ word, definition });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: `Request #${dictionary.length}`,
                totalEntries: dictionary.length
            }));
        });
    } 
    // CHECK THIS FUNCTION
    if (req.method === GET) {
        const word = reqUrl.query.word;
        const entry = dictionary.find(entry => entry.word === word);

        if (!entry) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: `Word '${word}' not found.` }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ word: entry.word, definition: entry.definition }));
    } 

    // Send to a 404 page
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
}). listen(env.PORT || 3000);