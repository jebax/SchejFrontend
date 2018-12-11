import React, { Component } from 'react'
import Calendar from './Calendar'
import { Switch, Route } from 'react-router-dom'

export default class Main extends Component {

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/calendar' component={Calendar}/>
        </Switch>
      </main>
    )
  }
}
