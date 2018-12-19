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
    const newResponse = { data: [1,2,3,4,5] }
    axios.get.mockResolvedValue(newResponse)
    const divs = wrapper.find('div')
    expect(divs.length).toEqual(7)
  })
})
