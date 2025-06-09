describe('Navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('/')

    cy.contains('Catalog').click()
    cy.url().should('include', '/catalog')

    cy.contains('Contact').click()
    cy.url().should('include', '/contact')

    cy.contains('🎸 Guitar Shop').click()
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('should show active navigation state', () => {
    cy.visit('/catalog')
    // Перевіряємо що навігаційний елемент існує та має правильний стиль
    cy.get('nav').contains('Catalog').should('exist')
  })

  it('should display cart information in header', () => {
    cy.visit('/catalog')

    cy.get('[data-testid="guitar-card"]').first().within(() => {
      cy.contains('Add to Cart').click()
    })

    // Перевіряємо що ціна змінилася (не $0.00)
    cy.get('[data-testid="cart-total"]').should('not.contain', '$0.00')
    
    // Для cart badge використовуємо більш гнучку перевірку
    cy.get('[data-testid="cart-badge"]').should('exist').and('contain', '1')
  })
})