import React from 'react'
import { create } from "react-test-renderer"
import SignInForm from '../components/SignInForm'
import axios from "axios"

jest.mock('axios')

describe('sign in form', () => {
  var component
  
  beforeAll(() => {
    component = create(<SignInForm />)
  })

  test("it matches the snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  test("it posts to the correct API when sign in credentials are correct", () => {
    const response = {
      data: {}
    }

    axios.post.mockResolvedValue(response)

    const form = component.root.findByType('form')

    const fakeEvent = { preventDefault: () => {} }

    form.props.onSubmit(fakeEvent)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/sign_in', {
        email: "",
        password: ""
      }
    )
  })
})
