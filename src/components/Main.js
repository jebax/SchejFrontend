import React from 'react'
import Shifts from './Shifts'
import SignUpForm from './SignUpForm'
import NewShiftForm from './NewShiftForm'
import SignInForm from './SignInForm'
import { Switch, Route } from 'react-router-dom'

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/shifts' component={Shifts}/>
        <Route exact path='/' component={SignInForm}/>
        <Route exact path='/shifts/new' component={NewShiftForm}/>
        <Route exact path='/sign_up' component={SignUpForm}/>
      </Switch>
    </main>
  )
}

export default Main
