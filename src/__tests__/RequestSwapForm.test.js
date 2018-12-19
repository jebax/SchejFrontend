import React from 'react'
import axios from 'axios'
import { mount, shallow } from 'enzyme'
import RequestSwapForm from '../components/RequestSwapForm'
import MockDate from 'mockdate'

jest.mock('axios')
jest.useFakeTimers()

describe('Request swap form', () => {
  var wrapper

  beforeAll(() => {
    global.localStorage['id'] = 1
    MockDate.set(1545151751163)

    const response = {
      data: [
        {
          start_time: new Date().getTime(),
          end_time: new Date().getTime()
        },
        {
          start_time: new Date().getTime(),
          end_time: new Date().getTime()
        }]
    }
    axios.get.mockResolvedValue(response)

    wrapper = shallow(<RequestSwapForm shiftInfo={{ shiftId: 1 }}/>)
  })

  test('it matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('it renders the correct form', () => {
    expect(wrapper.find('#request-swap-form').length).toEqual(1)
  })

  test('it renders a select box', () => {
    expect(wrapper.find('select').length).toEqual(1)
  })

  test('it renders a button to confirm a swap request', () => {
    const button = wrapper.find('#confirm-swap-request-form')
    expect(button.text()).toEqual('Confirm')
  })

  test('it makes the correct request to the API', () => {
    const select = wrapper.find('select')
    const form = wrapper.find('#request-swap-form')

    const response = {}

    axios.post.mockResolvedValue(response)
    select.simulate('change', { target: { name: 'userShift', value: 2 } })
    form.simulate('submit', { preventDefault() {} })

    jest.runAllTimers()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(
      `http://localhost:3001/api/v1/requests`, {
        requested_shift_id: 1,
        current_shift_id: 2
      }
    )
  })
})
