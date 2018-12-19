import React from 'react'
import axios from 'axios'
import { shallow } from 'enzyme'
import SignOutButton from '../components/SignOutButton'

jest.mock('axios')

describe('Sign out button', () => {
  var wrapper

  beforeAll(() => {
    wrapper = shallow(<SignOutButton history={[]}/>)
  })

  test('it matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('it renders a button', () => {
    const buttons = wrapper.find('button')
    expect(buttons.length).toEqual(1)
  })

  test('it makes the correct API call on click', () => {
    axios.delete.mockResolvedValue({})

    const button = wrapper.find('button')
    button.simulate('click')

    expect(axios.delete).toHaveBeenCalledTimes(1)
    expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/sign_out', {
        authentication_token: undefined
      }
    )
  })
})
