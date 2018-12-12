import React, { Component } from 'react'
import Calendar from './Calendar'
import SignUpForm from './SignUpForm'
import { Switch, Route } from 'react-router-dom'

export default class Main extends Component {

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/calendar' component={Calendar}/>
          <Route exact path='/' component={SignUpForm}/>
        </Switch>
      </main>
    )
  }
}
