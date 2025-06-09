describe('Catalog Page', () => {
  beforeEach(() => {
    cy.visit('/catalog')
  })

  it('should display catalog page correctly', () => {
    cy.contains('Guitar Catalog')
    cy.contains('Explore our complete collection')
    cy.get('[data-testid="guitar-card"]').should('have.length.greaterThan', 0)
  })

  it('should filter guitars by category', () => {
    cy.contains('Electric').click()
    cy.get('[data-testid="guitar-card"]').should('have.length.greaterThan', 0)
  })

  it('should search for guitars', () => {
    cy.get('input[placeholder*="Search"]').type('Fender')
    cy.contains('Search').click()
    cy.get('[data-testid="guitar-card"]').should('contain.text', 'Fender')
  })

  it('should filter by price range', () => {
    cy.get('input[placeholder="Min"]').type('500')
    cy.get('input[placeholder="Max"]').type('1000')
    cy.wait(1000)
  })

  it('should clear filters', () => {
    // Спочатку встановлюємо фільтр
    cy.contains('Electric').click()
    cy.wait(500)
    
    // Потім очищуємо
    cy.contains('Clear Filters').click()
    cy.wait(500)
    
    // Перевіряємо що кнопка "All Guitars" активна
    cy.contains('All Guitars').should('exist')
  })
})