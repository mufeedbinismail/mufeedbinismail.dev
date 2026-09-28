// Serves dist/ the way Cloudflare Pages does: /work/x → /work/x.html, and
// dist/404.html with a 404 status for anything missing. Used by Playwright;
// `astro preview` backgrounds itself, which Playwright cannot manage.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const port = Number(process.argv[2] ?? 4322);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.pdf': 'application/pdf' };

const isFile = (path) => stat(path).then((s) => s.isFile(), () => false);

async function fileFor(pathname) {
  const base = join(root, normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, ''));
  for (const candidate of [base, `${base}.html`, join(base, 'index.html')]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

createServer(async (req, res) => {
  const file = await fileFor(new URL(req.url, 'http://x').pathname);
  const path = file ?? join(root, '404.html');
  res.writeHead(file ? 200 : 404, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream' });
  res.end(await readFile(path));
}).listen(port, () => console.log(`serving dist/ on http://localhost:${port}`));
