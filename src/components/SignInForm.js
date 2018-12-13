import React, { Component } from 'react'
import axios from 'axios'
import { setAuthStorage } from '../actions/authentication'

export default class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      authenticationToken: localStorage['authenticationToken']
    }
}

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.createUserRequest()
  }
  
  createUserRequest = () => {
    const self = this
    axios.post(
      'http://localhost:3001/api/v1/sign_in',
      {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        setAuthStorage(response.data)
        self.props.history.push('/shifts')
        console.log(response)
      })
      .catch(error => {
        if (error.response.status === 422) {
          alert('Wrong email and password')
        } else {
          console.log(error)
        }
      })
    }

    render() {
      return (
        <form className='sign-in-form' onSubmit={this.handleSubmit}>
          <input id='sign-in-email-entry' className='sign-in-entry' type='text' name='email' placeholder='Email' onChange={this.handleChange} /><br />
          <input id='sign-in-password-entry' className='sign-in-entry' type='password' name='password' placeholder='Password' onChange={this.handleChange} /><br />
          <button id='sign-in-submit' className='custom-button'>Submit</button>
        </form>
      )
    }
    }
