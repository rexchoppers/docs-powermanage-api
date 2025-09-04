const { execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8005;
const BASE_DIR = process.cwd();

// 1️⃣ Bundle OpenAPI spec
console.log('Bundling OpenAPI spec...');
try {
    execSync('npx redocly bundle openapi.yaml -o complete.yaml', { stdio: 'inherit' });
    console.log('Bundle complete!');
} catch (err) {
    console.error('Bundle failed:', err);
}

// 2️⃣ Start HTTP server
const server = http.createServer((req, res) => {
    const filePath = path.join(BASE_DIR, req.url === '/' ? 'index.html' : req.url);

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
