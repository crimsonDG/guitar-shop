describe('Product Page', () => {
  beforeEach(() => {
    cy.visit('/catalog')
  })

  it('should navigate to product details', () => {
    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Details').click()
    })

    cy.url().should('include', '/product/')
    cy.contains('Back to Catalog')
  })

  it('should display product information', () => {
    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Details').click()
    })

    cy.get('[data-testid="product-name"]').should('be.visible')
    cy.get('[data-testid="product-price"]').should('be.visible')
    cy.get('[data-testid="product-description"]').should('be.visible')
    cy.contains('Specifications')
  })

  it('should add to cart from product page', () => {
    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Details').click()
    })

    cy.contains('Add to Cart').click()
    cy.get('[data-testid="cart-badge"]').should('contain', '1')
  })

  it('should navigate back to catalog', () => {
    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Details').click()
    })

    cy.contains('Back to Catalog').click()
    cy.url().should('include', '/catalog')
  })
})