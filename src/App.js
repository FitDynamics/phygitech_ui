import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/login/login'
import Student from './components/student/student'
import Teacher from './components/teacher/teacher'
import Org from './components/org/org'
import Admin from './components/admin/admin'

let app = (
  <BrowserRouter>
      <div>
          <Route exact path = '/' component={ Login } />
          <Route path = '/student' component = { Student } />
          <Route path = '/teacher' component = { Teacher } />
          <Route path = '/org' component = { Org } />
          <Route path = '/admin' component = { Admin } />
      </div>
  </BrowserRouter>
)

class App extends Component {
  render () {
    return app
  }
}

export default App;
