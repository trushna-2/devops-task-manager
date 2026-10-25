
const http = require('http');
const fs = require('fs');
const path = require('path');
const client = require('prom-client');

client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
    name: 'task_manager_http_requests_total',
    help: 'Total HTTP requests received'
});

const server = http.createServer(async (req, res) => {
   if (req.url.split('?')[0] !== '/metrics') {
    httpRequestCounter.inc();
}

if (req.url.split('?')[0] === '/metrics') {
        res.setHeader('Content-Type', client.register.contentType);
        return res.end(await client.register.metrics());
    }

    const file = path.join(__dirname, 'public',
        req.url === '/' ? 'index.html' : req.url);

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
