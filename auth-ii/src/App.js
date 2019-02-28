import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { NavLink, Route, withRouter} from 'react-router-dom';

import User from './User';
import Register from './components/register';
import Login from './components/login';

const url = process.env.REACT_APP_API_URL;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedIn: false
    };
  }

  authenticate = () => {
    const token = localStorage.getItem('secret_bitcoin_token');
    const options = {
      headers: {
        authentication: token,
      },
    };

    if (token) {
      axios.get(`${url}/api/users`, options)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, users: res.data });
          }
          else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.props.history.push('/login');

        });
    } else {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    console.log(this.props);
    console.log(prevProps);
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/api/login">Login</NavLink>
          <NavLink to="/api/register">Register</NavLink>
        </nav>
        <section>
          <div>
            <Route path="/api/register" component={Register} />
            <Route path="/api/login" component={Login} />
            <Route path="/" render={() => {
              return (
                <React.Fragment>
                <h2>Users</h2>
                  <ol>
                    {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
                  </ol>
                </React.Fragment>
              );
            }} />
          </div>

        </section>
      </div>
    );
  }
}

export default withRouter(App);