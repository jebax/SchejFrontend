describe("Viewing shifts", () => {
  it("should redirect if not signed in", () => {
    cy.visit('http://localhost:3000/shifts')
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
