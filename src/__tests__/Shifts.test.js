import React from 'react'
import { mount, shallow } from 'enzyme'
import MockDate from 'mockdate'
import Shifts from '../components/Shifts.js'

describe('Shifts', () => {
  var wrapper

  beforeAll(() => {
    global.localStorage['authenticationToken'] = 'TestToken'
    MockDate.set(1545151751163)
    wrapper = shallow(<Shifts history={[]}/>)
  })

  beforeEach(() => {
    global.localStorage.clear()
    global.localStorage['authenticationToken'] = 'TestToken'
  })

  test('it matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('it renders the sign out button', () => {
    expect(wrapper.find('SignOutButton')).toBeTruthy()
  })

  test('it renders the notifications button', () => {
    expect(wrapper.find('NotificationsButton')).toBeTruthy()
  })

  test('it renders the BigCalendar plugin component', () => {
    expect(wrapper.find('BigCalendar')).toBeTruthy()
  })

  test('it renders the shift popup', () => {
    expect(wrapper.find('ShiftPopup')).toBeTruthy()
  })

  test('it renders the new shift form', () => {
    expect(wrapper.find('NewShiftForm')).toBeTruthy()
  })

  test('it renders 2 popup components', () => {
    const popups = wrapper.find('Popup')
    expect(popups.length).toEqual(2)
  })

  test('it renders the add shift button', () => {
    expect(wrapper.find('#add-shift-button')).toBeTruthy()
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

  afterAll(() => {
    MockDate.reset()
    localStorage.clear()
  })
})
