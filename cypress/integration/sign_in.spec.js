describe('Signing in', () => {
  var stub

  before(() => {
    stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('http://localhost:3000/')
    cy.server()
    const data = {
      name: 'TestName',
      organisation: 'Testorganisation',
      job_title: 'TestTitle'
    }
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_in',
      response: data
    })

    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shifts?organisation=Testorganisation&job_title=TestTitle',
      response: []
    })
  })

  it('Redirects to shifts page and welcomes user after signing in', () => {
    cy.get('[id="sign-in-email-entry"]')
      .type('TestName')
    cy.get('[id="sign-in-password-entry"]')
      .type('TestPassword')
    cy.get('[id="sign-in-submit"]')
      .click()

    cy.url().should('eq', 'http://localhost:3000/shifts')
    cy.contains('Welcome TestName')
  })

  it('cannot submit if all fields are not filled', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[id="sign-in-email-entry"]')
      .type('TestEmail')
    cy.get('[id=sign-in-submit]').should('be.disabled')
    cy.get('[id="sign-in-password-entry"]')
      .type('TestPassword')

    cy.get('[id="sign-in-submit"]').should('not.be.disabled')
  })
})
