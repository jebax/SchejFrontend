import axios from 'axios'

describe("Signing up", () => {
  var stub

  beforeEach(() => {
    cy.visit('http://localhost:3000/sign_up')

    stub = cy.stub()
    cy.on('window:alert', stub)
  })

  it("redirects to the calendar", () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_up',
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
    cy.url().should('eq', 'http://localhost:3000/shifts')
  })

  it('cannot submit if all fields are not filled', () => {
    cy.get('[id=sign-up-submit]').should('be.disabled')
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
    cy.get('[id="sign-up-submit"]').should('not.be.disabled')
  })

  it('welcomes the user on the calendar page after signup', () => {
    const data = {
      name: 'TestName',
      organisation: 'Makers'
    }
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_up',
      response: data
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
    cy.url().should('eq', 'http://localhost:3000/shifts')
    cy.get('[id="welcome"]').contains('Welcome TestName')
  })

  it.skip('cannot submit if password and confirmation do not match', () => {
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
      .type('TestPassword1')
    cy.get('[id="sign-up-submit"]').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Passwords do not match')
      })
    })
  })
