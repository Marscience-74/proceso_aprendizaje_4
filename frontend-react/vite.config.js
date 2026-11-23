import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// envDir apunta a la raíz del repositorio: ahí vive el .env compartido.
// Vite solo expone al navegador las variables que empiezan con VITE_.
export default defineConfig({
  plugins: [react()],
  envDir: "..",
  server: { port: 5173 },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
