/// <reference types="cypress" />

// Questão 3 - E2E: login, adicionar 3 produtos, remover 1 e validar o carrinho
// Site: https://www.saucedemo.com/

describe('Questão 3 - Carrinho de compras (SauceDemo)', () => {
  it('Deve exibir o número "2" no ícone do carrinho após adicionar 3 e remover 1', () => {
    // 1. Login com sucesso
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce', { log: false });
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="title"]').should('have.text', 'Products');

    // 2. Adiciona três produtos diferentes
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Checagem intermediária: carrinho com 3 itens
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '3');

    // 3. Remove um dos produtos
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();

    // O botão do produto removido volta a ser "Add to cart"
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible');

    // 4. Valida que o emblema do carrinho mostra exatamente "2"
    cy.get('[data-test="shopping-cart-badge"]')
      .should('be.visible')
      .and('have.text', '2');
  });
});
