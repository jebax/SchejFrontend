describe('Signing out', () => {
  before(() => {
    cy.visit('http://localhost:3000/sign_up')
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_up',
      response: {
        data: {
          name: 'TestName',
          organisation: 'Testorganisation',
          job_title: 'TestTitle'
        }
      }
    })

    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shifts?organisation=Testorganisation&job_title=TestTitle',
      response: []
    })

    cy.get('[id="sign-up-name-entry"]')
      .type('TestName')
    cy.get('[id="sign-up-email-entry"]')
      .type('TestEmail')
    cy.get('[id="sign-up-organisation-entry"]')
      .type('Testorganisation')
    cy.get('[id="sign-up-job-title-entry"]')
      .type('TestTitle')
    cy.get('[id="sign-up-password-entry"]')
      .type('TestPassword')
    cy.get('[id="sign-up-mobile-entry"]')
      .type('07823012312')
    cy.get('[id="sign-up-password-confirmation"]')
      .type('TestPassword')
    cy.get('[id="sign-up-submit"]')
      .click()
  })

  it('redirects the user back to the sign in page', () => {
    cy.get('[id="sign-out-button"]').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
