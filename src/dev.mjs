// /fu/ dev — edit -> rebuild -> browser refreshes. Pure Node, no dependencies.
import fs   from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { exec          } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { buildTarget, walkMd, resolveHeader } from './build.mjs';
import { gatherRecords } from './relate.mjs';

const root          = new URL('../', import.meta.url);
const dist          = new URL('dist/',  root);
const local_        = new URL('local/', root);
const publicClients = new Set();
const toolsClients  = new Set();
const PUBLIC_PORT   = process.env.PORT       || 4321;
const TOOLS_PORT    = process.env.TOOLS_PORT || 4322;

function build() {
  try {
    // Public site
    buildTarget({
      contentDir: new URL('content/', root),
      outDir:     dist,
      imgDir:     new URL('img/', root),
    });

    // Private tools (if folder exists)
    const toolsDir = new URL('tools/', root);
    if (fs.existsSync(fileURLToPath(toolsDir))) {
      const publicFiles   = walkMd(fileURLToPath(new URL('content/', root)));
      const publicRecords = gatherRecords(publicFiles.filter(f => f.name !== 'header'));
      const publicHeader  = resolveHeader(new URL('content/', root), publicRecords);
      buildTarget({
        contentDir:       toolsDir,
        outDir:           local_,
        parentHeaderData: publicHeader,
      });
    }

    for (const res of publicClients) res.write('data: reload\n\n');
    for (const res of toolsClients)  res.write('data: reload\n\n');
  } catch (e) {
    console.error('  × build failed —', e.message);
  }
}

let timer;
const schedule = () => { clearTimeout(timer); timer = setTimeout(build, 80); };

build();

for (const dir of ['content/', 'src/', 'tools/', 'data/']) {
  const url = new URL(dir, root);
  if (fs.existsSync(fileURLToPath(url))) {
    fs.watch(url, { recursive: true }, (_e, f) => {
      if (!f || f.endsWith('~')) return;
      console.log('  · changed', f);
      schedule();
    });
  }
}

const TYPES = {
  '.html': 'text/html;charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.md': 'text/plain; charset=utf-8',
};
const RELOAD = `<script>new EventSource('/__live').onmessage=()=>location.reload()</script>`;

function makeServe(base) {
  return function tryServe(urlPath, res) {
    try {
      let data = fs.readFileSync(new URL('.' + urlPath, base));
      if (path.extname(urlPath) === '.html')
        data = Buffer.from(data.toString().replace('</body>', RELOAD + '</body>'));
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(urlPath)] || 'application/octet-stream' });
      res.end(data);
      return true;
    } catch {}
    return false;
  };
}

function dataHandlers(req, res) {
  // GET /data/* — serve raw data files from data/ on disk
  if (req.method === 'GET' && req.url.startsWith('/data/')) {
    const dest = new URL(decodeURIComponent(req.url.slice(1)), root);
    try {
      const data = fs.readFileSync(fileURLToPath(dest), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(data);
    } catch { res.writeHead(404); res.end('not found'); }
    return true;
  }

  // POST /data/* — write data files back to disk
  if (req.method === 'POST' && req.url.startsWith('/data/')) {
    const dest = new URL(decodeURIComponent(req.url.slice(1)), root);
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      try {
        fs.mkdirSync(fileURLToPath(new URL('.', dest)), { recursive: true });
        fs.writeFileSync(fileURLToPath(dest), body, 'utf8');
        res.writeHead(200); res.end('ok');
      } catch (e) { res.writeHead(500); res.end(e.message); }
    });
    return true;
  }

  return false;
}

// ── Public server (dist/) on PUBLIC_PORT ──────────────────────────────────────
const servePublic = makeServe(dist);
http.createServer((req, res) => {
  if (req.url === '/__live') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('\n');
    publicClients.add(res);
    req.on('close', () => publicClients.delete(res));
    return;
  }
  if (dataHandlers(req, res)) return;
  const urlPath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  if (!servePublic(urlPath, res)) { res.writeHead(404); res.end('not found'); }
}).listen(PUBLIC_PORT, () => {
  console.log(`\n  ✦ public  → http://localhost:${PUBLIC_PORT}`);
});

// ── Tools server (local/) on TOOLS_PORT ──────────────────────────────────────
const serveTools = makeServe(local_);
http.createServer((req, res) => {
  if (req.url === '/__live') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('\n');
    toolsClients.add(res);
    req.on('close', () => toolsClients.delete(res));
    return;
  }
  if (dataHandlers(req, res)) return;
  const urlPath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  if (!serveTools(urlPath, res)) { res.writeHead(404); res.end('not found'); }
}).listen(TOOLS_PORT, () => {
  console.log(`  ✦ tools   → http://localhost:${TOOLS_PORT}`);
  console.log('  edit content/ or tools/ and save — the page refreshes itself.');
  console.log('  when public looks right, upload the dist/ folder.\n');
  exec(`open http://localhost:${TOOLS_PORT}/`);
}).on('error', e => {
  console.error(`  × tools server failed on port ${TOOLS_PORT}:`, e.message);
});
