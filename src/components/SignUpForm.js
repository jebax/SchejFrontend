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

  render() {
    return (
      <form class='sign-up-form' onSubmit={this.handleSubmit}>
        <input id='sign-up-name-entry' type='text' name='name' placeholder='Name' onChange={this.handleChange}/>
        <input id='sign-up-organization-entry' type='text' name='organization' placeholder='Organization' onChange={this.handleChange} />
        <input id='sign-up-email-entry' type='text' name='email' placeholder='Email' onChange={this.handleChange} />
        <input id='sign-up-mobile-entry' type='text' name='mobile' placeholder='Mobile' onChange={this.handleChange} />
        <input id='sign-up-password-entry' type='password' name='password' placeholder='Password' onChange={this.handleChange} />
        <input id='sign-up-password-confirmation' type='password' name='passwordConfirmation' placeholder='Confirm Password' onChange={this.handleChange} />
        <input id='sign-up-submit' type='submit' value='Submit' />
      </form>
    )
  }
}
