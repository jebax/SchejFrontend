import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const localizer = BigCalendar.momentLocalizer(moment)

export default class Calendar extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(6,'hours')),
        title: 'Schej'
      }
    ]
  }

    render() {
      return(
        <div>
          <h1 id='title'>Schej</h1>
          <section id='welcome'>Welcome {localStorage['name']}</section>
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
