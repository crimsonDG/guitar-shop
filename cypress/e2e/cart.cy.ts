describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('/catalog')
  })

  it('should add item to cart', () => {
    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Add to Cart').click()
    })

    cy.get('[data-testid="cart-badge"]').should('contain', '1')
    cy.get('[data-testid="cart-total"]').should('not.contain', '$0.00')
  })

  it('should navigate to cart page', () => {
    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Add to Cart').click()
    })

    cy.get('[data-testid="cart-button"]').click()
    cy.url().should('include', '/cart')
    cy.contains('Shopping Cart')
  })

  it('should update quantity in cart', () => {
    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Add to Cart').click()
    })

    cy.get('[data-testid="cart-button"]').click()

    cy.get('[data-testid="quantity-increase"]').click()
    cy.get('[data-testid="quantity-display"]').should('contain', '2')
  })

  it('should remove item from cart', () => {
    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Add to Cart').click()
    })

    cy.get('[data-testid="cart-button"]').click()
    cy.get('[data-testid="remove-item"]').click()

    cy.contains('Your cart is empty')
  })
})