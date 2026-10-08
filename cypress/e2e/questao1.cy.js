/// <reference types="cypress" />

// Questão 1 - Validação da mensagem de erro no login (campos em branco)
// Site: https://the-internet.herokuapp.com/login

describe('Questão 1 - Mensagem de erro com login em branco', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login');

    // Garante que os campos estão em branco e clica em "Login"
    cy.get('#username').clear();
    cy.get('#password').clear();
    cy.get('button[type="submit"]').click();
  });

  it('1) A mensagem de erro deve conter "Your username is invalid!"', () => {
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!');
  });

  it('2) O balão <div id="flash"> deve possuir a classe CSS "error"', () => {
    cy.get('div#flash')
      .should('be.visible')
      .and('have.class', 'error');
  });
});
