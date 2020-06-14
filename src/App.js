import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/login/login'
import Student from './components/student/student'
import Teacher from './components/teacher/teacher'
import Org from './components/org/org'
import Admin from './components/admin/admin'
import Branch from './components/branch/branch'

let app = (
  <BrowserRouter>
      <div>
          <Route exact path = '/' component={ Login } />
          <Route path = '/student' component = { Student } />
          <Route path = '/teacher' component = { Teacher } />
          <Route path = '/org' component = { Org } />
          <Route path = '/admin' component = { Admin } />
          <Route path = '/branch' component = { Branch } />
      </div>
  </BrowserRouter>
)

class App extends Component {

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 50);
          var allowURL = 0;
          var URL = window.location.pathname;

          switch (URL) {
          case '/':
          allowURL = 1;
          break;
          default:
          allowURL = 0;
          }
          if (allowURL === 0) {
          window.location.href = '/';
          }
    }

  render () {
    return app
  }
}

export default App;
