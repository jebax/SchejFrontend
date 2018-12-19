import React from 'react'
import { mount, shallow } from 'enzyme'
import axios from 'axios'
import NotificationsButton from '../components/NotificationsButton'
import NotificationsList from '../components/NotificationsList'
import Popup from 'reactjs-popup'

jest.mock('axios')

jest.useFakeTimers()

describe('Notifications button', () => {
  var wrapper
  var initialResponse

  beforeAll(() => {
    initialResponse = { data: [] }
    axios.get.mockResolvedValue(initialResponse)

    wrapper = mount(<NotificationsButton onClose={() => {}}/>)
  })

  it('renders a button', () => {
    const buttons = wrapper.find('button')

    expect(buttons.length).toEqual(1)
  })

  it('renders a Popup', () => {
    const popups = wrapper.find(Popup)

    expect(popups.length).toEqual(1)
  })

  it('has 0 notifications listed on its button initially', () => {
    const button = wrapper.find('#notifications-button')

    expect(button.props().children[0]).toEqual("Notifications (", 0, ")")
  })

  it('sets its state correctly when button is clicked', () => {
    const button = wrapper.find('#notifications-button')

    button.simulate('click')

    expect(wrapper.state().notificationsOpen).toEqual(true)
  })

  it('updates its notifications when popup modal is closed', () => {
    const newResponse = { data: [1, 2, 3, 4, 5] }
    axios.get.mockResolvedValue(newResponse)

    wrapper.instance().closeModal()

    const button = wrapper.find('#notifications-button')
    jest.runAllTimers()
    expect(button.props().children[0]).toEqual("Notifications (", 5, ")")
  })

  it('updates its state correctly when popup modal is closed', async () => {
    wrapper.instance().closeModal()
    wrapper.props().onClose = jest.fn()

    jest.runAllTimers()
    expect(wrapper.state().notificationsOpen).toEqual(false)
  })
})
