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
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf'
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  // API: POST /api/leads
  if (urlPath === '/api/leads' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const lead = JSON.parse(body);
        console.log(`[${new Date().toLocaleTimeString()}] 📋 Novo lead:`, lead);

        // Salva em leads.json
        const leadsFile = path.join(__dirname, 'leads.json');
        const leads = fs.existsSync(leadsFile)
          ? JSON.parse(fs.readFileSync(leadsFile, 'utf-8'))
          : [];
        leads.push({ ...lead, timestamp: new Date().toISOString() });
        fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

        res.writeHead(200, { 'Content-Type': 'application/json', ...CORS_HEADERS });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json', ...CORS_HEADERS });
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Serve arquivos estáticos
  let filePath = '.' + urlPath;
  if (filePath === './') filePath = './index.html';

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${urlPath}`);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, CORS_HEADERS);
      res.end(err.code === 'ENOENT' ? '404 - Not Found' : '500 - Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType, ...CORS_HEADERS });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('API de leads: POST http://localhost:${PORT}/api/leads');
});
