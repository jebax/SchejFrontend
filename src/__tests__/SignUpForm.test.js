import React from 'react'
import { create } from "react-test-renderer"
import { shallow } from 'enzyme'
import SignUpForm from '../components/SignUpForm'
import axios from "axios"

jest.mock('axios')

describe("sign up form", () => {
  var component
  var wrapper

  beforeAll(() => {
    component = create(<SignUpForm history = {[]}/>)
    wrapper = shallow(<SignUpForm history = {[]}/>)
  })

  test("it matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test("it posts to the API of the new user when form is valid", () => {
    const response = {
      data: {
        name: "TestName",
        id: "1",
        organisation: "TestOrganisation",
        job_title: "TestJob"
      }
    }

    axios.post.mockResolvedValue(response)

    const form = component.root.findByType('form')

    const fakeEvent = { preventDefault: () => {} }

    component.getInstance().hasNonMatchingPasswords = jest.fn()
    component.getInstance().hasInvalidPassword = jest.fn()

    form.props.onSubmit(fakeEvent)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/sign_up', {
        name: "",
        email: "",
        organisation: "",
        job_title: "",
        mobile: "",
        password: "",
        passwordConfirmation: ""
      }
    )
  })

  test('It has a disabled submit button by default', () => {
    const button = component.root.findByProps({id: 'sign-up-submit'})

    expect(button.props.disabled).toBeTruthy()
  })
})
