import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        public: resolve(__dirname,"src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        
      
      },
    },
  },
  preview: {
    port: parseInt(process.env.PORT || '4173', 10), // Use the Render-provided PORT
    host: '0.0.0.0', // Ensure the app binds to 0.0.0.0
  },
  server: {
    fs: {
      strict: false, // Allow serving files from src
    },
  },
  base: '/',

});



