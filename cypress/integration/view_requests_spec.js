describe("Viewing requests", () => {
  it("should show requests in a list", () => {

    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/sign_up',
      response: { id: '1' }
    })
    cy.route({
      method:'GET',
      url: 'http://localhost:3001/api/v1/requestsbyuser/1',
      response: [
                  {
                      "id": 1,
                      "comment": null,
                      "requesterShift": {
                        "id": 2,
                        "userId": 2,
                        "name": "Requester",
                        "start": "1545085481938",
                        "end": "1545114281938"
                      },
                      "respondentShift": {
                          "id": 1,
                          "userId": 1,
                          "name": "Responder",
                          "start": "1546304400000",
                          "end": "1546308000000"
                      }
                  },
                  {
                      "id": 1,
                      "comment": null,
                      "requesterShift": {
                        "id": 2,
                        "userId": 2,
                        "name": "Requester",
                        "start": "1545085481938",
                        "end": "1545114281938"
                      },
                      "respondentShift": {
                          "id": 1,
                          "userId": 1,
                          "name": "Responder",
                          "start": "1546304400000",
                          "end": "1546308000000"
                      }
                  },
              ]
            })

    cy.visit('http://localhost:3000')

    cy.get('[id="sign-up-button"]')
      .click()

    cy.get('[id="sign-up-name-entry"]')
      .type('TestName')
    cy.get('[id="sign-up-email-entry"]')
      .type('TestEmail')
    cy.get('[id="sign-up-job-title-entry"]')
      .type('TestTitle')
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

    cy.contains('Requester wants to swap shifts with you.')
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
