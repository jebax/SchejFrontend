import React from 'react'
import { mount, shallow } from 'enzyme'
import BigCalendar from 'react-big-calendar'
import MockDate from 'mockdate'
import Shifts from '../components/Shifts.js'
import axios from 'axios'

jest.mock('axios')

describe('Shifts', () => {
  var wrapper

  beforeAll(() => {
    global.localStorage['authenticationToken'] = 'TestToken'
    const response = {}
    axios.get.mockResolvedValue(response)
    MockDate.set(1545151751163)

    wrapper = shallow(<Shifts history={[]}/>)
  })

  beforeEach(() => {
    global.localStorage.clear()
    global.localStorage['authenticationToken'] = 'TestToken'
    global.localStorage['organisation'] = 'TestOrganisation'
    global.localStorage['jobTitle'] = 'TestTitle'
  })

  test('it matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('it renders the sign out button', () => {
    expect(wrapper.find('SignOutButton').length).toEqual(1)
  })

  test('it renders the notifications button', () => {
    expect(wrapper.find('NotificationsButton').length).toEqual(1)
  })

  test('it renders the BigCalendar plugin component', () => {
    const calendars = wrapper.find(BigCalendar)
    expect(calendars.length).toEqual(1)
  })

  test('it renders the shift popup', () => {
    expect(wrapper.find('ShiftPopup').length).toEqual(1)
  })

  test('it renders the new shift form', () => {
    expect(wrapper.find('NewShiftForm').length).toEqual(1)
  })

  test('it renders 2 popup components', () => {
    const popups = wrapper.find('Popup')
    expect(popups.length).toEqual(2)
  })

  test('it renders the add shift button', () => {
    expect(wrapper.find('#add-shift-button').length).toEqual(1)
  })

  test('it welcomes the user based on the browser local storage', () => {
    global.localStorage['name'] = 'TestName'

    const welcomeName = wrapper.find('#welcome-name')

    setTimeout(() => {
      expect(welcomeName.text()).toEqual('Welcome TestName')
    }, 20)
  })

  test('it shows the user organisation based on browser local storage', () => {
    global.localStorage['organisation'] = 'TestOrganisation'

    const welcomeOrganisation = wrapper.find('#welcome-organisation')

    setTimeout(() => {
      expect(welcomeOrganisation.text()).toEqual(
        'Organisation: TestOrganisation'
      )
    }, 20)
  })

  test('it makes a request to the correct API address', () => {
    const shiftsResponse = {
      data: [
        {
          title: 'TestName',
          email: 'TestEmail',
          organisation: 'TestOrganisation',
          start_time: new Date(),
          end_time: new Date(),
          id: '1',
          user_id: '1'
        }
      ]
    }
    axios.get.mockResolvedValue(shiftsResponse)

    wrapper.instance().getAllShifts()

    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:3001/api/v1/shifts?organisation=${global.localStorage['organisation']}&job_title=${global.localStorage['jobTitle']}`
    )
  })

  test('it makes a request when closing notifications modal', () => {
    const button = wrapper.find('NotificationsButton')
    button.props().onClose()

    setTimeout(() => {
      expect(axios.get).toHaveBeenCalledTimes(3)
      expect(button.props().open).toEqual(false)
    }, 20)
  })

  test('it can open the new shift form by clicking button', () => {
    expect(wrapper.instance().state.newShiftOpen).toEqual(false)

    const button = wrapper.find('#add-shift-button')
    button.simulate('click')

    expect(wrapper.instance().state.newShiftOpen).toEqual(true)
  })

  test('it can close the new shift form', () => {
    const button = wrapper.find('#add-shift-button')
    button.simulate('click')

    wrapper.instance().closeModal()

    expect(wrapper.instance().state.newShiftOpen).toEqual(false)
  })

  test('it can open the correct shift on calendar when clicked', () => {
    const shift = {
      eventId: 1,
      title: 'TestTitle',
      userId: 1,
      start: new Date(),
      end: new Date(),
      email: 'TestEmail'
    }
    expect(wrapper.instance().state.events).toEqual([])

    wrapper.find(BigCalendar).props().onSelectEvent(shift)

    setTimeout(() => {
      expect(wrapper.instance().state.events).toEqual([shift])
    }, 10)
  })

  afterAll(() => {
    MockDate.reset()
    localStorage.clear()
  })
})
