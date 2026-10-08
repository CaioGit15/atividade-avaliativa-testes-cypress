/// <reference types="cypress" />

// Questão 4 - Inteligência de mercado: laptop mais caro (Demoblaze)
// Site: https://www.demoblaze.com/

describe('Questão 4 - Laptop mais caro do Demoblaze', () => {
  it('Deve extrair nome e preço do laptop mais caro e validar preço > $0', () => {
    // Intercepta a chamada que carrega os produtos da categoria
    cy.intercept('POST', '**/bycat').as('produtosPorCategoria');

    cy.visit('https://www.demoblaze.com/');

    // Clica em "Laptops" no menu lateral esquerdo
    cy.contains('#contcont .list-group a', 'Laptops').click();

    // Aguarda o carregamento dos produtos da categoria
    cy.wait('@produtosPorCategoria').its('response.statusCode').should('eq', 200);
    cy.get('#tbodyid .card').should('have.length.greaterThan', 0);
    // Garante que a lista antiga (celulares) já foi substituída
    cy.contains('#tbodyid', 'Samsung galaxy s6').should('not.exist');

    // Extrai nome e preço de todos os laptops e identifica o mais caro
    cy.get('#tbodyid .card').then(($cards) => {
      const produtos = [...$cards].map((card) => ({
        nome: Cypress.$(card).find('.card-title a').text().trim(),
        preco: parseFloat(
          Cypress.$(card).find('.card-block h5').text().replace(/[^0-9.]/g, '')
        ),
      }));

      const maisCaro = produtos.reduce((a, b) => (b.preco > a.preco ? b : a));

      cy.task('log', `Laptops encontrados: ${JSON.stringify(produtos)}`);
      cy.task('log', `Laptop mais caro: ${maisCaro.nome} - $${maisCaro.preco}`);
      cy.log(`Laptop mais caro: ${maisCaro.nome} - $${maisCaro.preco}`);

      // Asserção final: valor extraído superior a $0
      expect(maisCaro.nome, 'nome do laptop').to.not.be.empty;
      expect(maisCaro.preco, 'preço do laptop mais caro').to.be.greaterThan(0);
    });
  });
});
