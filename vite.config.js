import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Set the root to the src directory
  build: {
    outDir: '../dist', // Specify where the build output should go
  },
  publicDir: '../static' // Serve static assets from the static directory
});
