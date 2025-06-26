// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // ← toujours une string
    setupNodeEvents(on, config) {
      // event listeners optionnels
    },
  },
});
