import React from 'react'
import { mount, shallow } from 'enzyme'
import SignInForm from '../components/SignInForm'
import axios from "axios"

jest.mock('axios')

describe('sign in form', () => {
  var wrapper

  beforeAll(() => {
    wrapper = shallow(<SignInForm history = {[]}/>)
  })

  beforeEach(() => {
    window.localStorage.clear()
  })

  test("it matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('it renders a button to go to the sign up page', () => {
    const mountedWrapper = mount(<SignInForm history={[]} />)
    const button = mountedWrapper.find('#sign-up-button')

    button.simulate('click')

    expect(mountedWrapper.props().history).toEqual(['/sign_up'])
  })

  test("it posts to the correct API when sign in credentials are correct", () => {
    const response = {
      data: {}
    }
    axios.post.mockResolvedValue(response)

    const form = wrapper.find('.sign-in-form')
    const fakeEvent = { preventDefault () {} }

    form.props().onSubmit(fakeEvent)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/sign_in', {
        email: "",
        password: ""
      }
    )
  })

  test('It has a disabled submit button by default', () => {
    const button = wrapper.find('#sign-in-submit')

    expect(button.props('disabled')).toBeTruthy()
  })

  test('It redirects to the shifts calendar if already signed in', () => {
    localStorage['authenticationToken'] = 'TestToken'
    const secondWrapper = mount(<SignInForm history={[]} />)

    expect(secondWrapper.props().history).toEqual(['/shifts'])
  })

  afterAll(() => {
    localStorage.clear()
  })
})
