import React from 'react';
import axios from 'axios';
import '../App.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div className="login">
        <h2>Welcome!</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              name="username"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>
          <br></br>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // const endpoint = 'http://localhost:5555/api/auth/login';

    axios
      .post('/login', this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);

        this.props.history.push('/users');
      })
      .catch(error => console.error(error));
  };
}

export default Login;
