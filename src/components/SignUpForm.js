import React, { Component } from 'react'

export default class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      organization: "",
      email: "",
      mobile: "",
      password: "",
      passwordConfirmation: ""
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.history.push('/calendar')
  }

  isValidated = () => {
    return this.state.name.length > 0 && this.state.organization.length > 0 &&
      this.state.email.length > 0 && this.state.mobile.length > 0 &&
      this.state.password.length > 0 && this.state.passwordConfirmation.length > 0
  }

  render() {
    return (
      <form className='sign-up-form' onSubmit={this.handleSubmit}>
        <input id='sign-up-name-entry' className='sign-up-entry' type='text' name='name' placeholder='Name' onChange={this.handleChange}/><br />
        <input id='sign-up-organization-entry' className='sign-up-entry' type='text' name='organization' placeholder='Organization' onChange={this.handleChange} /><br />
        <input id='sign-up-email-entry' className='sign-up-entry' type='text' name='email' placeholder='Email' onChange={this.handleChange} /><br />
        <input id='sign-up-mobile-entry' className='sign-up-entry' type='text' name='mobile' placeholder='Mobile' onChange={this.handleChange} /><br />
        <input id='sign-up-password-entry' className='sign-up-entry' type='password' name='password' placeholder='Password' onChange={this.handleChange} /><br />
        <input id='sign-up-password-confirmation' className='sign-up-entry' type='password' name='passwordConfirmation' placeholder='Confirm Password' onChange={this.handleChange} /><br /><br />
        <button id='sign-up-submit' className='custom-button' disabled={!this.isValidated()}>Submit</button>
      </form>
    )
  }
}
