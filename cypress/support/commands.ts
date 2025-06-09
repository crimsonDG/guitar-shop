/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      addToCart(): Chainable<Element>
      clearCart(): Chainable<Element>
      visitProduct(productId: string): Chainable<Element>
    }
  }
}

Cypress.Commands.add('addToCart', () => {
  cy.get('[data-testid="guitar-card"]').first().within(() => {
    cy.contains('Add to Cart').click()
  })
})

Cypress.Commands.add('clearCart', () => {
  cy.visit('/cart')
  cy.get('body').then(($body) => {
    if ($body.find('[data-testid="clear-cart"]').length > 0) {
      cy.get('[data-testid="clear-cart"]').click()
    }
  })
})

Cypress.Commands.add('visitProduct', (productId: string) => {
  cy.visit(`/product/${productId}`)
})

export {}