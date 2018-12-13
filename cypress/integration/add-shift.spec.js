describe("Adding shift", () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_up',
      response: []
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/shifts',
      response: ''
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shifts?organisation=Testorganisation',
      response: {
        data: {
          title: 'TestEmail',
          start_time: '1544601600000',
          end_time: '1544616000000'
        }
      }
    })
    cy.visit('http://localhost:3000/sign_up')

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
  })

  it("redirects to a form to add a shift", () => {
    cy.get('[id="add-shift-button"]')
      .click()
    cy.url().should('eq', 'http://localhost:3000/shifts/new')
  })

  it("creates a shift", () => {
    cy.get('[id="add-shift-button"]')
      .click()
    cy.get('[id="new-shift-start-year-entry"]')
      .type('2018')
    cy.get('[id="new-shift-start-month-entry"]')
      .type('11')
    cy.get('[id="new-shift-start-day-entry"]')
      .type('1')
    cy.get('[id="new-shift-start-hour-entry"]')
      .type('9')
    cy.get('[id="new-shift-duration-entry"]')
      .type('8')
    cy.get('[id="new-shift-submit"]').click()
    cy.url().should('eq', 'http://localhost:3000/shifts')
    cy.contains('TestEmail')
  })
})
