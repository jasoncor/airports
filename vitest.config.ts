import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["vitest.setup.ts"],
    environment: "happy-dom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/routes/**/*",
        "src/**/*.spec.tsx",
        "src/**/*.d.ts",
        "src/**/*.config.ts",
        "src/**/index.tsx",
        "src/**/main.tsx",
      ],
    },
  },
});
