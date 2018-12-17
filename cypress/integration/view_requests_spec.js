describe("Viewing requests", () => {
  it("should show requests in a list", () => {

    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_up',
      response: { id: '1' }
    })

    cy.visit('http://localhost:3000')

    cy.get('[id="sign-up-button"]')
      .click()

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

    cy.get('[id="notifications-button"]')
      .click()
    cy.route({
      method:'GET',
      url: 'http://localhost:3001/api/v1/requestsbyuser/1',
      response: [
                  {
                    "id": 1,
                    "shift_requester_id": 2,
                    "shift_holder_id": 1,
                    "comment": 'Want your shift',
                    "requested_shift_id": 1,
                    "current_shift_id": 2,
                    "created_at": new Date(),
                    "updated_at": new Date(),
                }]
            })
    cy.contains('2 wants to swap shifts with you.')
  })
  it("can accept a request", () => {
    cy.get('[id="approve-swap-button"]')
      .first().click()
    cy.contains("Thanks! Your shifts have been swapped.")
  })
  it("can decline a request", () => {
    cy.get('[id="decline-swap-button"]')
      .first().click()
    cy.contains("You have declined to swap.")
  })
})
