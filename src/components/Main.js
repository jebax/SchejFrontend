import React, { Component } from 'react'
import Shifts from './Shifts'
import SignUpForm from './SignUpForm'
import { Switch, Route } from 'react-router-dom'

export default class Main extends Component {

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/shifts' component={Shifts}/>
          <Route exact path='/' component={SignUpForm}/>
        </Switch>
      </main>
    )
  }
}
