import React from 'react'
import { mount } from 'cypress-react-unit-test'
import NewShiftForm from '../../../src/components/NewShiftForm'

describe('<NewShiftForm />', () => {
  beforeEach(() => {
    mount(<NewShiftForm />)
  })

  it('has a field for start date components', () => {
    cy.get('[id="new-shift-start-year-entry"]')
      .type('2018')
      .should('have.value', '2018')
    cy.get('[id="new-shift-start-month-entry"]')
      .type('11')
      .should('have.value', '11')
    cy.get('[id="new-shift-start-day-entry"]')
      .type('1')
      .should('have.value', '1')
    cy.get('[id="new-shift-start-hour-entry"]')
      .type('9')
      .should('have.value', '9')
  })

  it('has a field for shift duration in hours', () => {
    cy.get('[id="new-shift-duration-entry"]')
      .type('8')
      .should('have.value', '8')
  })
})
