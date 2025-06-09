describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display homepage correctly', () => {
    cy.contains('Find Your Perfect Guitar')
    cy.contains('Why Choose Guitar Shop?')
    cy.contains('Featured Guitars')
  })

  it('should navigate to catalog from hero button', () => {
    cy.contains('Explore Our Collection').click()
    cy.url().should('include', '/catalog')
    cy.contains('Guitar Catalog')
  })

  it('should navigate to catalog from view all button', () => {
    cy.contains('View All Guitars').click()
    cy.url().should('include', '/catalog')
  })

  it('should display featured guitars', () => {
    cy.get('[data-testid="guitar-card"]').should('have.length.greaterThan', 0)
  })
})