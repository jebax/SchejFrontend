import React from 'react'
import { mount, shallow } from 'enzyme'
import ShiftPopup from '../components/ShiftPopup'

describe('Shift Popup', () => {
  var wrapper

  beforeAll(() => {
    wrapper = shallow(<ShiftPopup shiftInfo = {
      {
        start: { toLocaleString() {} },
        end: { toLocaleString() {} }
      }
    }/>)
  })


  test("it matches the snapshot", () => {
    console.log(wrapper);
    expect(wrapper).toMatchSnapshot()
  })

  test('it renders the shift popup div ', () => {
    expect(wrapper.find('#shift-popup')).toBeTruthy()
  })

  

  })

})
