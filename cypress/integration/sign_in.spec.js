describe('signs in a user', () => {
  var stub

  before(() => {
    cy.visit('http://localhost:3000')
    cy.server()
    const data = {
      name: 'TestName'
    }
    cy.route({
      method:'DELETE',
      url: 'http://localhost:3001/api/v1/sign_out',
      response: ''
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_up',
      response: data
    })

    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shifts',
      response: []
    })

    cy.get('[id="sign-up-name-entry"]')
      .type('TestName')
    cy.get('[id="sign-up-email-entry"]')
      .type('TestEmail')
    cy.get('[id="sign-up-organisation-entry"]')
      .type('Testorganisation')
    cy.get('[id="sign-up-password-entry"]')
      .type('TestPassword')
    cy.get('[id="sign-up-mobile-entry"]')
      .type('07823012312')
    cy.get('[id="sign-up-password-confirmation"]')
      .type('TestPassword')
    cy.get('[id="sign-up-submit"]')
      .click()
    cy.get('[id="sign-out-button"]').click()
  })

  it('takes user to login page', () => {
    cy.get('[id="login-button"]').click()
    cy.url().should('eq', 'http://localhost:3000/sign_in')
  })
})
