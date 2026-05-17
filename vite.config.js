import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // IMPORTANT FOR GITHUB PAGES DEPLOYMENT
  base: "/Smart-Attendance/",

  // VITEST CONFIG
  test: {
    globals: true,
    environment: "jsdom"
  }
})