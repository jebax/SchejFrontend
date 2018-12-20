describe("Adding shift", () => {
  beforeEach(() => {
    const data = {
      name: 'TestName',
      organisation: 'Testorganisation',
      job_title: 'TestTitle'
    }

    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_up',
      response: data
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/shifts',
      response: ''
    })
    cy.visit('http://localhost:3000/sign_up')

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

  it("shows a pop-up form to add a new shift", () => {
    cy.get('[id="add-shift-button"]')
      .click()
    cy.contains('Add a new shift')
  })

  it("creates a shift", () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shifts?organisation=Testorganisation&job_title=TestTitle',
      response: [{
          title: 'TestEmail',
          start: '1544601600000',
          end: '1544616000000'
        }]
    })
    cy.get('[id="add-shift-button"]')
      .click()
    cy.get('[id="new-shift-submit"]').click()
    cy.contains('TestEmail')
  })
})
