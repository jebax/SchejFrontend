import React from 'react'
import { create } from "react-test-renderer"
import { mount, shallow } from 'enzyme'
import axios from 'axios'
import EmergencyRequestForm from '../components/EmergencyRequestForm'


jest.mock('axios')

describe('Emergency Request Form', () => {
  var wrapper

  beforeAll(() => {
    wrapper = shallow(<EmergencyRequestForm history = {[]} shiftInfo = {{
      shiftId: 1
    }}/>)
  })

  test("it matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test("it renders a form", () => {
    const form = wrapper.find("form")
    expect(form.length).toEqual(1)
  })

  test("it renders a button on the form", () => {
    const button = wrapper.find("button")
    expect(button.length).toEqual(1)
  })

  test("it makes correct api request when the button is clicked", () => {
    axios.post.mockResolvedValue({})
    const form = wrapper.find("form")
    const fakeEvent = { preventDefault () {} }
    form.props().onSubmit(fakeEvent)
    expect(axios.post).toHaveBeenCalledTimes(1)
  })

  test("it sends the correct parameters in the api request", () => {
    axios.post.mockResolvedValue({})
    const form = wrapper.find("form")
    const comment = wrapper.find("input")
    comment.simulate('change', { target: { value: 'this is a comment' } })
    const fakeEvent = { preventDefault () {} }
    form.props().onSubmit(fakeEvent)
    setTimeout(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/api/v1/emergency_requests', {
          comment: "this is a comment",
          emergency_shift_id: 1
        }
      )
    }, 20)
  })
})
