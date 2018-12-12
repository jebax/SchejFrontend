import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import AddShiftButton from './AddShiftButton'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const localizer = BigCalendar.momentLocalizer(moment)

export default class Shifts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(6,'hours')),
          title: 'Schej'
        }
      ]
    }
  }

    render() {
      if (!localStorage['authenticationToken']) {
        this.props.history.push('/')
      }
      return(
        <div>
          <h1 id='title'>Schej</h1>
          <section id='welcome'>
            <h2>Welcome {localStorage['name']}</h2>
            <AddShiftButton
              history={this.props.history}
            />
          </section>
          <div>
            <BigCalendar
              localizer = { localizer }
              defaultDate = { new Date() }
              selectable
              defaultView = "month"
              events= { this.state.events }
              style={{ height: '100vh' }}
            />
          </div>
        </div>
    )}
}
