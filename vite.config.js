import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 7071,
    // host: "0.0.0.0", // Bind to all interfaces (not just localhost)
    strictPort: true,
    // allowedHosts: "all",
    allowedHosts: ['8990-39-63-27-56.ngrok-free.app']
  },
});
