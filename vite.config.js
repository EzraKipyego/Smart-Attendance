import { defineConfig } from "vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()]
    }),
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