import { defineConfig } from 'vite';
import restart from 'vite-plugin-restart'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  root: './src', // Set the root to the src directory
  build: {
    outDir: '../dist', // Specify where the build output should go
  },
  publicDir: '../static', // Serve static assets from the static directory
  plugins:
  [
    restart({ restart: [ '../static/**', ] }), // Restart server on static file change
    glsl() // Handle shader files
]
});
