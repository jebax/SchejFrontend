import React from 'react'
import { create } from "react-test-renderer"
import { mount, shallow } from 'enzyme'
import axios from 'axios'
import MockDate from 'mockdate'
import NotificationsList from '../components/NotificationsList'

jest.mock('axios')
jest.useFakeTimers()

describe('Notifications List', () => {
  var wrapper
  var initialResponse

  beforeAll(() => {
    MockDate.set(1545151751163)
    global.localStorage['id'] = '2'
    initialResponse = { data: [
    {
        id: 25,
        comment: null,
        respondentShift: {
            id: 36,
            userId: 11,
            name: "TestName2",
            start: new Date().getTime(),
            end: new Date().getTime()
        },
        requesterShift: {
            id: 36,
            userId: 11,
            name: "TestName2",
            start: new Date().getTime(),
            end: new Date().getTime()
        }
    }
]}
    axios.get.mockResolvedValue(initialResponse)
    wrapper = shallow(<NotificationsList history = {[]} />)
  })

  test("it matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test("it renders a notifications list", () => {
    const divs = wrapper.find('div')
    expect(divs.length).toEqual(4)
  })

  test("it renders a notification list with notifications", () => {
    const newResponse = {
      data: [
        {
          id: 25,
          comment: null,
          respondentShift: {
              id: 36,
              userId: 11,
              name: "TestName2",
              start: new Date().getTime(),
              end: new Date().getTime()
          },
          requesterShift: {
              id: 36,
              userId: 11,
              name: "TestName2",
              start: new Date().getTime(),
              end: new Date().getTime()
          }
        }
      ]
    }
    axios.get.mockResolvedValue(newResponse)
    jest.runAllTimers()
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
