// @ts-check
import { defineConfig } from 'astro/config';

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

  integrations: [react()],
});