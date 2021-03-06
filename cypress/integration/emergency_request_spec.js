describe('Requesting emergency cover for a shift', () => {
  var stub

  before(() => {
    stub = cy.stub()
    cy.on('window:alert', stub)

    const data = {
      name: 'TestName',
      organisation: 'Testorganisation',
      job_title: 'TestTitle',
      id: '1'
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
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shifts?organisation=Testorganisation&job_title=TestTitle',
      response: [{
          title: 'TestName',
          start: '1544601600000',
          end: '1544616000000',
          email: 'TestEmail',
          eventId: '1',
          userId: 1
        }]
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

  it('shift has emergency cover button', () => {
    cy.get('[title="TestName"]').click()
    cy.contains('Request emergency cover')
  })

  it('can render a emergency request form', () => {
    cy.get('[id="toggle-emergency-popup-content"]').click()
    cy.contains('Emergency Request Form')
  })
})
