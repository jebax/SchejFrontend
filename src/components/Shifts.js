import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import NewShiftForm from './NewShiftForm'
import SignOutButton from './SignOutButton'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Popup from "reactjs-popup";
import ShiftPopup from './ShiftPopup'
const localizer = BigCalendar.momentLocalizer(moment)

export default class Shifts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      open: false,
      newShiftOpen: false,
      displayedShift: ''
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal (shift){
   this.setState({
     open: true,
     displayedShift: {
       shiftId: shift.eventId,
       title: shift.title,
       userId: shift.userId,
       start: shift.start,
       end: shift.end,
       email: shift.email
     }
   })
 }

 openNewShiftModal = () => {
   this.setState({
     newShiftOpen: true
   })
 }

 closeModal () {
   this.setState({
     open: false,
     newShiftOpen: false
   })
 }


  componentWillMount() {
    axios.get(
      `${process.env.REACT_APP_API_URL}/shifts?organisation=${localStorage['organisation']}`
    )
    .then(response => {
      console.log(response)
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
            userId: shiftData[i].user_id,
            email: shiftData[i].email
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
            <button id="add-shift-button" onClick={this.openNewShiftModal}>Add Shift</button>
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
              onSelectEvent={(shift) => this.openModal(shift)}
              events= { this.state.events }
              style={{ height: '100vh' }}
            />
          </div>
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <ShiftPopup
              shiftInfo={this.state.displayedShift}
              history={this.props.history}
            />
          </Popup>
          <Popup
            open={this.state.newShiftOpen}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <NewShiftForm
              history={this.props.history}
            />
          </Popup>
        </div>
    )}
}
