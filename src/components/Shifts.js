import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import AddShiftButton from './AddShiftButton'
import SignOutButton from './SignOutButton'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const localizer = BigCalendar.momentLocalizer(moment)

export default class Shifts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }


  componentWillMount() {
    axios.get(
      `http://localhost:3001/api/v1/shifts?organisation=${localStorage['organisation']}`
    )
    .then(response => {
      let shiftData = response.data
      for(var i in shiftData) {
        shiftData[i].start_time = new Date(parseInt(shiftData[i].start_time))
        shiftData[i].end_time = new Date(parseInt(shiftData[i].end_time))

        this.setState(prevState => ({
          events: [...prevState.events, {
            title: shiftData[i].title,
            start: shiftData[i].start_time,
            end: shiftData[i].end_time,
            eventId: shiftData[i].id,
            userId: shiftData[i].user_id
          }]
        }))
      }
    })
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
            <h3>Organisation: {localStorage['organisation']}</h3>
            <AddShiftButton
              history={this.props.history}
            />
            <SignOutButton
              history={this.props.history}
            />
          </section>
          <div>
            <BigCalendar
              localizer = { localizer }
              defaultDate = { new Date() }
              selectable
              defaultView = "month"
              onSelectEvent={(event) => console.log(event)}
              events= { this.state.events }
              style={{ height: '100vh' }}
            />
          </div>
        </div>
    )}
}
