import React from 'react'
import { mount, shallow } from 'enzyme'
import ShiftPopup from '../components/ShiftPopup'

describe('Shift Popup', () => {
  var wrapper

  beforeAll(() => {
    global.localStorage['id'] = 1

    wrapper = mount(<ShiftPopup shiftInfo = {
      {
        start: { toLocaleString() {} },
        end: { toLocaleString() {} },
        userId: 1
      }
    }/>)
  })


  test("it matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('it renders the shift popup div ', () => {
    expect(wrapper.find('#shift-popup')).toBeTruthy()
  })

  test('it shows the request form when the toggle button is pressed', () => {
    const button = wrapper.find('#toggle-popup-content')

    button.simulate('click')

    expect(wrapper.state().showingRequestForm).toEqual(true)
    expect(wrapper.find("RequestSwapForm")).toBeTruthy()
  })

  

})
