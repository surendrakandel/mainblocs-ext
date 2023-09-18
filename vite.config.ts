import { crx, type ManifestV3Export } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [
    svelte(),
    crx({ manifest: manifest as unknown as ManifestV3Export }),
  ],
});
