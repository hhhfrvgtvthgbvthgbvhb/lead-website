import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { products } from './scripts/products.mjs';
import { newsItems } from './scripts/news.mjs';

const pages = {
  home: 'index.html',
  products: 'products/index.html',
  door: 'door-panel-embossing-machine/index.html',
  about: 'about/index.html',
  contact: 'contact/index.html',
  qa: 'qa/index.html',
  news: 'news/index.html',
  ...Object.fromEntries(newsItems.map(x => [x.slug, `news/${x.slug}/index.html`])),
  ...Object.fromEntries(products.map(p => [p.slug, `products/${p.slug}/index.html`]))
};

const localizedPages = Object.fromEntries(['ru','ar','es'].flatMap(locale =>
  Object.entries(pages).map(([name,path]) => [`${locale}-${name}`,`${locale}/${path}`])
));
const allPages = {...pages,...localizedPages};

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.entries(allPages).map(([name, path]) => [name, resolve(process.cwd(), path)]))
    }
  }
});
