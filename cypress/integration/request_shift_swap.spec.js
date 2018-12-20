describe('Requesting a shift swap', () => {
  var stub

  before(() => {
    stub = cy.stub()
    cy.on('window:alert', stub)

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
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shifts?organisation=Testorganisation&job_title=TestTitle',
      response: [{
          title: 'TestName',
          start: '1544601600000',
          end: '1544616000000',
          email: 'TestEmail'
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

  it('can view an individual shift before swapping', () => {
    cy.get('[title="TestName"]').click()
    cy.contains('Shift Information')
    cy.contains('TestEmail')
    cy.contains('12/12/2018, 08:00:00')
    cy.contains('12/12/2018, 12:00:00')
  })

  it('can render a shift swapping form', () => {
    cy.get('[id="toggle-popup-content"]').click()
    cy.contains('Request a shift swap')
  })
})
