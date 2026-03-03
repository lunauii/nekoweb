// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  markdown: {
      shikiConfig: {
          theme: 'tokyo-night',
      },
  },

  site: 'https://neko.lunaui.cc',
  base: '/',

  redirects: {
      "/res/images/hotlink-ok/button.gif": "/hotlink-ok/button.gif"
  },

  integrations: [react(), 
    {
    name: 'rename-not-found',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const distDir = fileURLToPath(dir);
        const oldFile = `${distDir}404.html`;
        const newFile = `${distDir}not_found.html`;

        if (fs.existsSync(oldFile)) {
          fs.renameSync(oldFile, newFile);
          console.log('moved not_found.html to root');
        }
      }
    }
  }
  ],
});