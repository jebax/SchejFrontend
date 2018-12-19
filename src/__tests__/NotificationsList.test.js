import React from 'react'
import { create } from "react-test-renderer"
import { mount, shallow } from 'enzyme'
import axios from 'axios'
import NotificationsList from '../components/NotificationsList'

jest.mock('axios')

describe('Notifications List', () => {
  var wrapper
  var initialResponse

  beforeAll(() => {
    global.localStorage['id'] = '2'
    initialResponse = { data: [] }
    axios.get.mockResolvedValue(initialResponse)
    wrapper = shallow(<NotificationsList history = {[]} />)
  })

  test("it matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test("it renders a notifications list", () => {
    const divs = wrapper.find('div')
    expect(divs.length).toEqual(2)
  })

  test("it renders a notification list with notifications", () => {
    const newResponse = {
      data: [
        {
          id: 1,
          shift_requester_id: 1,
          shift_holder_id: 2,
          comment: "test comment",
          requested_shift_id: 2,
          current_shift_id: 1
        },
        {
          id: 3,
          emergency_requester_id: 3,
          comment: "emergency test comment",
          emergency_shift_id: 3
        }
      ]
    }
    axios.get.mockResolvedValue(newResponse)
    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:3001/api/v1/requestsbyuser/${global.localStorage['id']}`
    )
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:3001/api/v1/emergency_requests?user_id=${global.localStorage['id']}`
    )
  })

  afterAll(() => {
    global.localStorage.clear()
  })
})
