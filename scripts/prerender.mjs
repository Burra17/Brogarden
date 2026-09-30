// Förrenderar varje sida efter `vite build`. dist/index.html från klientbygget
// används som mall: appens HTML läggs i #root och sidans metadata i <head>, så att
// innehållet syns innan JavaScript laddats och delningstjänster får rätt rubrik.
//   /        → dist/index.html
//   /boende  → dist/boende.html (Cloudflare Pages serverar den på /boende)
//   okänd    → dist/404.html (Cloudflare svarar med status 404)
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST_DIR = 'dist';
const SERVER_DIR = path.join(DIST_DIR, 'server');

const { render, routes, notFoundPage, contactInfo } = await import(pathToFileURL(path.join(SERVER_DIR, 'entry-server.js')).href);
const template = await readFile(path.join(DIST_DIR, 'index.html'), 'utf-8');

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Byter ut en del av mallen och avbryter bygget om den inte hittas,
// så att en ändrad index.html inte tyst ger sidor utan metadata. Ersättningen skickas
// som funktion så att tecken som $& i texten inte tolkas som specialmönster.
const replaceOnce = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`Hittade inte ${pattern} i ${DIST_DIR}/index.html`);
  return html.replace(pattern, () => replacement);
};

// Metadata per sida. canonical och og:url utelämnas för 404-sidan.
const headTags = ({ title, description, path: pagePath }) => {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  ];
  if (pagePath) {
    const url = `${contactInfo.siteUrl}${pagePath}`;
    tags.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`);
  }
  return tags.join('\n    ');
};

const renderPage = (url, meta) => {
  let html = replaceOnce(template, /<meta\s+name="description"[^>]*>\s*/, '');
  html = replaceOnce(html, /<title>[^<]*<\/title>/, headTags(meta));
  return replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render(url)}</div>`);
};

const pages = [
  ...routes.map((route) => ({ url: route.path, file: route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`, meta: route })),
  { url: '/404', file: '404.html', meta: { ...notFoundPage, path: undefined } },
];

for (const { url, file, meta } of pages) {
  await writeFile(path.join(DIST_DIR, file), renderPage(url, meta));
}

// Serverbygget behövs bara här och ska inte publiceras
await rm(SERVER_DIR, { recursive: true, force: true });

console.log(`Förrenderade: ${pages.map((page) => page.file).join(', ')}`);
