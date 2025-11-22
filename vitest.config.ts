import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types.ts',
        '**/constants.ts',
        '**/*.d.ts',
        '**/*.module.css.d.ts',
        '**/*.module.css',
        'example/',
        'dist/',
        'vite.config.ts',
        'vitest.config.ts',
        // Exclude canvas-related utilities (difficult to test in JSDOM)
        '**/canvasUtils.ts',
        '**/cropImage.ts',
        // Exclude index files (barrel exports)
        '**/index.ts',
        // Exclude preview component (relies on canvas rendering)
        '**/PreviewArea.tsx'
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
        statements: 70
      }
    }
  }
});
