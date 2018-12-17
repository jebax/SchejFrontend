import React, { Component } from 'react'
import Main from './Main'

export default class App extends Component {

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        </header>
        <Main />
      </div>
    )
  }
}
