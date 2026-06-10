// /fu/ dev — the workshop loop: edit text -> rebuild -> the browser refreshes.
// Pure Node, no dependencies. Nothing here ships; it only shows you results.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execFileSync, exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const clients = new Set();
const PORT = process.env.PORT || 4321;

function build() {
  try {
    execFileSync(process.execPath, [fileURLToPath(new URL('src/render.mjs', root))], { stdio: 'inherit' });
    for (const res of clients) res.write('data: reload\n\n');
  } catch {
    console.error('  × build failed — fix the text and save again');
  }
}

let timer;
const schedule = () => { clearTimeout(timer); timer = setTimeout(build, 80); };

build();
for (const dir of ['content/', 'src/']) {
  fs.watch(new URL(dir, root), { recursive: true }, (_e, f) => {
    if (!f || f.endsWith('~')) return;
    console.log('  · changed', f);
    schedule();
  });
}

const TYPES = {
  '.html': 'text/html;charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml',
};
const RELOAD = `<script>new EventSource('/__live').onmessage=()=>location.reload()</script>`;

http.createServer((req, res) => {
  if (req.url === '/__live') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  const urlPath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  fs.readFile(new URL('.' + urlPath, dist), (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    const ext = path.extname(urlPath);
    if (ext === '.html') data = Buffer.from(data.toString().replace('</body>', RELOAD + '</body>'));
    res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`\n  ✦ preview live → http://localhost:${PORT}`);
  console.log('  edit content/index.md and save — the page refreshes itself.');
  console.log('  when it looks right, upload the dist/ folder.\n');
  exec(`open http://localhost:${PORT}`);
});
