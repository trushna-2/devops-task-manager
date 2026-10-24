const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const file = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end('File not found');
        }
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});