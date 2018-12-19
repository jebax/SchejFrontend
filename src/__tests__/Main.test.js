import React from 'react'
import { shallow } from 'enzyme'
import Main from '../components/Main'

describe('Main', () => {
  var wrapper

  beforeAll(() => {
    wrapper = shallow(<Main />)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a Switch component', () => {
    const switches = wrapper.find('Switch')
    expect(switches.length).toEqual(1)
  })

  it('renders four Routes', () => {
    const routes = wrapper.find('Route')
    expect(routes.length).toEqual(4)
  })
})
