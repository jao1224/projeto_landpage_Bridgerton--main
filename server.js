const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  // Remove query strings from URL
  let urlPath = req.url.split('?')[0];
  let filePath = '.' + urlPath;
  if (filePath === './') filePath = './index.html';

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url} -> ${filePath}`);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(`  ❌ 404 - Arquivo não encontrado: ${filePath}`);
        res.writeHead(404);
        res.end('404 - File Not Found');
      } else {
        console.log(`  ❌ 500 - Erro: ${err.message}`);
        res.writeHead(500);
        res.end('500 - Internal Server Error');
      }
    } else {
      console.log(`  ✅ 200 - ${contentType}`);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Pressione Ctrl+C para parar o servidor');
});
