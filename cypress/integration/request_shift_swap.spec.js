describe('Requesting a shift swap', () => {
  before(() => {
    const data = {
      name: 'TestName',
      organisation: 'Testorganisation',
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
      url: 'http://localhost:3001/api/v1/shifts?organisation=Testorganisation',
      response: {
        data: {
          title: 'TestEmail',
          start_time: '1544601600000',
          end_time: '1544616000000',
          id: "1"
        }
      }
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/shiftsbyuser/1',
      response: {
        data: [
          {
            id: "1",
            title: "TestName",
            start_time: '1544601600000',
            end_time: '1544616000000',
            user_id: "1",
            organisation: "Testorganisation",
            email: "TestEmail"
          }
        ]
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
  })

  it('can view an individual shift before swapping', () => {
    cy.get('[title="TestEmail"]').click()
    cy.contains('Shift Information')
    cy.contains('TestEmail')
    cy.contains('12/12/2018, 08:00:00')
    cy.contains('12/12/2018, 12:00:00')
  })

  it('can render a shift swapping form', () => {
    cy.get('[class="custom-button"]').click()
    cy.contains('Request a shift swap')
  })

  it.skip('can select own shift', () => {
    cy.get('[name="chosenShift"]').select('1')
    cy.get('[className="menu"]').should('have.value', '1')
  })
})
