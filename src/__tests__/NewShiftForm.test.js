import React from 'react'
import { create } from "react-test-renderer"
import { shallow } from "enzyme"
import Flatpickr from 'react-flatpickr'
import NewShiftForm from '../components/NewShiftForm'
import axios from "axios"
import MockDate from "mockdate"

jest.mock('axios')

describe('new shift form', () => {
  var wrapper

  beforeAll(() => {
    MockDate.set(1545151751163)
    wrapper = shallow(<NewShiftForm history = {[]}/>)
  })

  test("it matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test("it always renders a div", () => {
    const divs = wrapper.find("div")
    expect(divs.length).toEqual(1)
  })

  test("it always renders 2 Flatpickr calendars", () => {
    const calendars = wrapper.find(Flatpickr)
    expect(calendars.length).toEqual(2)
  })

  test("it renders a submit button", () => {
    const button = wrapper.find("button")
    expect(button.props().children).toEqual("Submit")
  })

  test("makes correct api request when button is clicked", () => {
    axios.post.mockResolvedValue({})
    const form = wrapper.find("form")
    const fakeEvent = { preventDefault () {} }
    form.props().onSubmit(fakeEvent)
    expect(axios.post).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    MockDate.reset()
  })
})
