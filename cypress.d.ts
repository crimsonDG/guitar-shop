/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    addToCart(): Chainable<Element>
    clearCart(): Chainable<Element>
    visitProduct(productId: string): Chainable<Element>
  }
}