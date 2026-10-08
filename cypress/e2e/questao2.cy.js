/// <reference types="cypress" />

// Questão 2 - Aguardar o loader desaparecer e validar o texto final
// Site: https://the-internet.herokuapp.com/dynamic_loading/1

describe('Questão 2 - Carregamento dinâmico (spinner/loader)', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/dynamic_loading/1');
  });

  it('Deve aguardar o "Loading..." sumir e exibir "Hello World!"', () => {
    // Estado inicial: texto final ainda oculto
    cy.get('#finish').should('not.be.visible');

    cy.contains('button', 'Start').click();

    // A barra de progresso "Loading..." aparece...
    cy.get('#loading').should('be.visible').and('contain.text', 'Loading...');

    // ...e o Cypress aguarda (retry automático, sem cy.wait fixo) ela desaparecer
    cy.get('#loading', { timeout: 15000 }).should('not.be.visible');

    // Valida o texto final exibido na tela
    cy.get('#finish')
      .should('be.visible')
      .and('have.text', 'Hello World!');
  });
});
