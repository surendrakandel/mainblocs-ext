# Svelte + TS + Vite + Tailwind CSS

[Svelte and Tailwind for Chrome Extension](https://carlogino.com/blog/svelte-chromium-extension)

[VS Code need set svelte plugin setting enable: svelte.enable-ts-plugin](https://github.com/sveltejs/language-tools/tree/master/packages/svelte-vscode#svelteenable-ts-plugin)

## Vite

### Init with Vite、Svelte、TypeScript

```bash
npm init vite
cd [your-project-name]
npm install
npm run dev
```

## Tailwind CSS

### Install & Tnit

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init tailwind.config.cjs -p
```

### Modify tailwind.config.js

```js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // ...
}
```

### Modify src/app.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
h1 {
  @apply text-4xl font-bold;
}
h2 {
  @apply text-3xl font-bold;
}
```

## CRXJS

### Install beta version for vite@3.0+

```bash
npm i @crxjs/vite-plugin@beta -D
```

## Chrome Manifest.json

### Create manifest.json

Reference
[V3](https://developer.chrome.com/docs/extensions/mv3/intro/)

### Update tsconfig.json

```json
{
  "compilerOptions": {
   // ...
    "baseUrl": ".",
   }
}
```

### Update tsconfig.node.json

```json
{
  "compilerOptions": {
    // other props
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "manifest.json"]
}
```

### Update vite.config.js

```js
import { crx } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
});
```

## TypeScript types support for Chrome Plugin

```bash
npm i -D @types/chrome
```
