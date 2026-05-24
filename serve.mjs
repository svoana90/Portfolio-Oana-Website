import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  const filePath = join(__dirname, req.url === '/' ? 'index.html' : req.url);
  try {
    const content = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'text/plain' });
    res.end(content);
  } catch {
    try {
      const content = await readFile(join(__dirname, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
