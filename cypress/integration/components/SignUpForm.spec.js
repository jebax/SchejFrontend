import React from 'react'
import { mount } from 'cypress-react-unit-test'
import SignUpForm from '../../../src/components/SignUpForm'

describe('<SignUpForm />', () => {
  beforeEach(() => {
    mount(<SignUpForm />)
  })

  it('has an entry field for name', () => {
    cy.get('[id="sign-up-name-entry"]')
      .type('TestName')
      .should('have.value', 'TestName')
  })

  it('has an entry field for email', () => {
    cy.get('[id="sign-up-email-entry"]')
      .type('TestEmail')
      .should('have.value', 'TestEmail')
  })

  it('has an entry field for organization', () => {
    cy.get('[id="sign-up-organization-entry"]')
      .type('TestOrganization')
      .should('have.value', 'TestOrganization')
  })

  it('has an entry field for password', () => {
    cy.get('[id="sign-up-password-entry"]')
      .type('TestPassword')
      .should('have.value', 'TestPassword')
  })
})
