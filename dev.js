// dev.js
const chokidar = require('chokidar');
const { exec } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8005;
const BASE_DIR = process.cwd();

const server = http.createServer((req, res) => {
    let filePath = path.join(BASE_DIR, req.url === '/' ? 'index.html' : req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'text/plain';
        if (ext === '.html') contentType = 'text/html';
        if (ext === '.yaml' || ext === '.yml') contentType = 'application/yaml';
        if (ext === '.json') contentType = 'application/json';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => console.log(`HTTP server running at http://localhost:${PORT}`));

const watcher = chokidar.watch(
    [
        'openapi.yaml',
        'api/**/*.yaml'
    ],
    { persistent: true });

const bundle = () => {
    console.log('Bundling OpenAPI spec...');
    exec('npx redocly bundle openapi.yaml -o complete.yaml', (err, stdout, stderr) => {
        if (err) console.error('Bundle error:', stderr);
        else console.log('Bundle complete!');
    });
};

bundle();

watcher.on('change', (filePath) => {
    console.log(`File changed: ${filePath}`);
    bundle();
});
