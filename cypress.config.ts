// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // ← toujours une string
    supportFile: 'cypress/support/e2e.ts',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // event listeners optionnels
    },
  },
});
