import React, { Component } from 'react'
import IndexTitle from './IndexTitle'
import axios from 'axios'
import { setAuthStorage } from '../actions/authentication'

export default class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      organisation: "",
      jobTitle: "",
      email: "",
      mobile: "",
      password: "",
      passwordConfirmation: ""
    }
  }

  componentWillMount() {
    if (localStorage['authenticationToken']) {
      this.props.history.push('/shifts')
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.hasNonMatchingPasswords()) {
      alert('Passwords do not match')
    } else if (this.hasInvalidPassword()) {
      alert('Password must be at least 6 characters')
    } else {
      this.createUserRequest()
    }
  }

  createUserRequest = () => {
    const self = this
    axios.post(
      `${process.env.REACT_APP_API_URL}/sign_up`,
      {
        name: this.state.name,
        organisation: this.state.organisation,
        job_title: this.state.jobTitle,
        email: this.state.email,
        mobile: this.state.mobile,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      }
    )
    .then(response => {
      setAuthStorage(response.data)
      self.props.history.push('/shifts')
      console.log(response)
    })
    .catch(error => {
      if (error.response.status === 422) {
        alert('Email already taken')
      } else {
        console.log(error)
      }
    })
  }

  isValidated = () => {
    return this.state.name.length > 0 && this.state.organisation.length > 0 &&
      this.state.email.length > 0 && this.state.mobile.length > 0 &&
      this.state.password.length > 0 && this.state.passwordConfirmation.length > 0
  }

  hasNonMatchingPasswords = () => {
    return this.state.password !== this.state.passwordConfirmation
  }

  hasInvalidPassword = () => {
    return this.state.password.length < 6
  }

  redirectSignIn = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div id='sign-up-page'>
        <IndexTitle />
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <input id='sign-up-name-entry' className='sign-up-entry' type='text' name='name' placeholder='Name' onChange={this.handleChange}/><br />
          <input id='sign-up-organisation-entry' className='sign-up-entry' type='text' name='organisation' placeholder='Organisation' onChange={this.handleChange} /><br />
          <input id='sign-up-job-title-entry' className='sign-up-entry' type='text' name='jobTitle' placeholder='Job Title' onChange={this.handleChange} /><br />
          <input id='sign-up-email-entry' className='sign-up-entry' type='text' name='email' placeholder='Email' onChange={this.handleChange} /><br />
          <input id='sign-up-mobile-entry' className='sign-up-entry' type='text' name='mobile' placeholder='Mobile' onChange={this.handleChange} /><br />
          <input id='sign-up-password-entry' className='sign-up-entry' type='password' name='password' placeholder='Password' onChange={this.handleChange} /><br />
          <input id='sign-up-password-confirmation' className='sign-up-entry' type='password' name='passwordConfirmation' placeholder='Confirm Password' onChange={this.handleChange} /><br /><br />
          <button id='sign-up-submit' className='custom-button' disabled={!this.isValidated()}>Submit</button>
        </form>
        <button id='sign-in-button' className='custom-button' onClick={this.redirectSignIn}>Sign In</button>
      </div>
    )
  }
}
