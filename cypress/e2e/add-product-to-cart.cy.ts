import { env } from "@/env"

describe('Add product to cart', () => {
  beforeEach(() => { 
    cy.visit(`/`)
  })

  it('should be able to navigate to the product page', () => {

    
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('adicionar ao carrinho').click()
    cy.contains('adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {

    cy.searchByQuery('camiseta')
    // cy.get('input[name="q"]').type('camiseta').type('{enter}')
    cy.get('a[href^="/product"]').first().click()
    cy.location('pathname').should('include', '/product')
    cy.contains('adicionar ao carrinho').click()
    
    cy.contains('Cart (1)').should('exist')
  })
})