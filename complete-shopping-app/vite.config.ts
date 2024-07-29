// Import the defineConfig function from the Vite package
import { defineConfig } from 'vite';

// Import the react plugin from the @vitejs/plugin-react package
import react from '@vitejs/plugin-react';

// Define the configuration object for Vite
export default defineConfig({
  // Specify the plugins to be used by Vite
  plugins: [
    // Use the react plugin to enable React support in Vite
    react(),
  ],
  // Specify the server configuration
  server: {
    // Specify the proxy configuration for the server
    proxy: {
      // Proxy requests starting with '/api' to the 'http://localhost:3000' target
      // with the 'changeOrigin' option set to true
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // Proxy requests starting with '/login' to the 'http://localhost:3000' target
      // with the 'changeOrigin' option set to true
      '/login': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // Proxy requests starting with '/register' to the 'http://localhost:3000' target
      // with the 'changeOrigin' option set to true
      '/register': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // Proxy requests starting with '/logout' to the 'http://localhost:3000' target
      // with the 'changeOrigin' option set to true
      '/logout': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
