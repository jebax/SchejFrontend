import React from 'react'
import { mount, shallow } from 'enzyme'
import SignUpForm from '../components/SignUpForm'
import axios from "axios"

jest.mock('axios')

describe("sign up form", () => {
  var wrapper

  beforeAll(() => {
    wrapper = shallow(<SignUpForm history = {[]}/>)
  })

  beforeEach(() => {
    localStorage.clear()
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

    const form = wrapper.find('.sign-up-form')
    const fakeEvent = { preventDefault() {} }

    wrapper.instance().hasNonMatchingPasswords = jest.fn()
    wrapper.instance().hasInvalidPassword = jest.fn()

    form.props().onSubmit(fakeEvent)

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
    const button = wrapper.find('#sign-up-submit')

    expect(button.props().disabled).toBeTruthy()
  })

  test('it renders a button to go to the sign up page', () => {
    const mountedWrapper = mount(<SignUpForm history={[]} />)
    const button = mountedWrapper.find('#sign-in-button')

    button.simulate('click')

    expect(mountedWrapper.props().history).toEqual(['/'])
  })

  test('alerts the user when email already taken', () => {
    const result = Promise.reject({ response: { status: 422 } })
    axios.post.mockImplementation(() => result)

    global.alert = jest.fn()

    const form = wrapper.find('.sign-up-form')
    const fakeEvent = { preventDefault() {} }

    wrapper.instance().hasNonMatchingPasswords = jest.fn()
    wrapper.instance().hasInvalidPassword = jest.fn()

    form.props().onSubmit(fakeEvent)

    setTimeout(() => {
      expect(global.alert).toHaveBeenCalledTimes(1)
      expect(global.alert).toHaveBeenCalledWith('Email already taken')
    }, 10)
  })

  test('alerts the user if passwords do not match', () => {
    global.alert = jest.fn()

    const fakeEvent = { preventDefault() {} }
    const form = wrapper.find('.sign-up-form')

    wrapper.instance().hasNonMatchingPasswords.mockImplementation(() => true)

    form.props().onSubmit(fakeEvent)

    expect(global.alert).toHaveBeenCalledWith('Passwords do not match')
  })

  test('alerts the user if password is invalid length', () => {
    global.alert = jest.fn()

    const fakeEvent = { preventDefault() {} }
    const form = wrapper.find('.sign-up-form')

    wrapper.instance().hasNonMatchingPasswords.mockImplementation(() => false)
    wrapper.instance().hasInvalidPassword.mockImplementation(() => true)

    form.props().onSubmit(fakeEvent)

    expect(global.alert).toHaveBeenCalledWith('Password must be at least 6 characters')
  })

  test('It redirects to the shifts calendar if already signed in', () => {
    localStorage['authenticationToken'] = 'TestToken'
    const secondWrapper = mount(<SignUpForm history={[]} />)

    expect(secondWrapper.props().history).toEqual(['/shifts'])
  })

  afterAll(() => {
    localStorage.clear()
    wrapper.unmount()
  })
})
