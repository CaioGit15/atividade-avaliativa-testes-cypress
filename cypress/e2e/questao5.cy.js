/// <reference types="cypress" />

// Questão 5 - Robô de ofertas: produtos abaixo de $20.00 (SauceDemo)
// Site: https://www.saucedemo.com/

const LIMITE_PRECO = 20.0;

describe('Questão 5 - Rastreio de ofertas abaixo de $20.00', () => {
  it('Deve listar (console + arquivo) apenas os produtos que custam menos de $20.00', () => {
    // Login
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce', { log: false });
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');

    // Mapeia todos os itens da vitrine
    cy.get('[data-test="inventory-item"]')
      .should('have.length.greaterThan', 0)
      .then(($itens) => {
        const todos = [...$itens].map((item) => ({
          nome: Cypress.$(item).find('[data-test="inventory-item-name"]').text().trim(),
          preco: parseFloat(
            Cypress.$(item)
              .find('[data-test="inventory-item-price"]')
              .text()
              .replace(/[^0-9.]/g, '')
          ),
        }));

        // Filtra apenas os produtos abaixo de $20.00
        const ofertas = todos.filter((p) => p.preco < LIMITE_PRECO);

        // Exibe no console (terminal)
        const linhas = ofertas.map((p) => `- ${p.nome}: $${p.preco.toFixed(2)}`);
        cy.task(
          'log',
          `\n=== Produtos abaixo de $${LIMITE_PRECO.toFixed(2)} ` +
            `(${ofertas.length} de ${todos.length}) ===\n${linhas.join('\n')}\n`
        );
        cy.log(`Ofertas encontradas: ${ofertas.length} de ${todos.length}`);

        // Salva em arquivo
        cy.writeFile('cypress/results/produtos_abaixo_20.json', ofertas);
        cy.writeFile(
          'cypress/results/produtos_abaixo_20.txt',
          `Produtos abaixo de $${LIMITE_PRECO.toFixed(2)}\n${linhas.join('\n')}\n`
        );

        // Validações
        expect(todos.length, 'itens mapeados na vitrine').to.be.greaterThan(0);
        expect(ofertas.length, 'ofertas encontradas').to.be.greaterThan(0);
        ofertas.forEach((p) => {
          expect(p.preco, `preço de "${p.nome}"`).to.be.lessThan(LIMITE_PRECO);
        });
      });
  });
});
