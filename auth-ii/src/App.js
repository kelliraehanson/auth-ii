import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';

import Login from './login/Login';
import Users from './users/Users';
import Register from './register/Register';

class App extends Component {
  render() {
    return (
      <div className="everything">
        <header>
          <nav>
            <div className="navBar">

            <div className="navBar1">

            <NavLink to="/register">Register</NavLink> 
            &nbsp;|&nbsp;

            <NavLink to="/login">Login</NavLink>
            &nbsp;|&nbsp;

            <NavLink to="/users">Users</NavLink>
            {/* &nbsp;|&nbsp; */}
            </div>
            
            <button onClick={this.logout}>Logout</button>
            </div>
          </nav>
        </header>
        <main>
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
          <Route path="/register" component={Register} />
        
        </main>
      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');

    this.props.history.push('/login');
  };
}

export default withRouter(App);
