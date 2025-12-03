import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
export default defineConfig({
  // server: {
  //   port: 7071,
  //   strictPort: true,
  //   allowedHosts: ['8990-39-63-27-56.ngrok-free.app']
  // },
  plugins: [react()],
  base: "/", // ← REQUIRED for Vercel
  build: {
    outDir: "dist", // ← matches vercel.json
  },
});
