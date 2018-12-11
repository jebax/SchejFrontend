import React, { Component } from 'react'

export default class SignUpForm extends Component {
  render() {
    return (
      <form>
        <input id='sign-up-name-entry' type='text' name='name' placeholder='Name' />
        <input id='sign-up-organization-entry' type='text' name='organization' placeholder='Organization' />
        <input id='sign-up-email-entry' type='text' name='email' placeholder='Email' />
        <input id='sign-up-mobile-entry' type='text' name='mobile' placeholder='Mobile' />
        <input id='sign-up-password-entry' type='password' name='password' placeholder='Password' />
        <input id='sign-up-password-confirmation' type='password' name='password-confirmation' placeholder='Confirm Password' />
        <input id='sign-up-submit' type='submit' value='Submit' />
      </form>
    )
  }
}
