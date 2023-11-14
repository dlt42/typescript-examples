import { defineConfig } from "vite";

export default defineConfig(() => ({
  resolve: {
    alias: {
      src: `./src`,
    },
  },
  test: {
    include: [`src/**/*.test.ts`],
  },
}));
