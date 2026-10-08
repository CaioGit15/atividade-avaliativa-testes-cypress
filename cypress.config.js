const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: false,
    video: false,
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on) {
      on('task', {
        // Permite imprimir mensagens no terminal: cy.task('log', 'texto')
        log(mensagem) {
          console.log(mensagem);
          return null;
        },
      });
    },
  },
});
