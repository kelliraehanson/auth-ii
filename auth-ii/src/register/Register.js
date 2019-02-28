import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        username: "",
        password: "",
        department: ""
    };

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
        <h3>Register here!</h3>

            <div className="form-username">
            <input
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder='Name'
                type="text"
            />
            </div>
            <br></br>

            <div>
            <input
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder='Password'
                type="text"
            />
            </div>
            <br></br>

            <div>
            <input
                name="department"
                value={this.state.department}
                onChange={this.handleChange}
                placeholder='Department'
                type="text"
            />
            </div>
            <br></br>

            <div>
            <button type='submit'>Register</button>
            </div>

        </form>
        );
    }

    handleInputChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        // e.preventDefault();

        const endpoint = 'http://localhost:5555/api/register';

        
        axios
        .post(endpoint, this.state)
        .then(res => {

            localStorage.setItem('jwt', res.data.token)
            this.props.history.push('/login');
        })
        .catch(err => {
            console.log('Error from Login', err)
        })
    }
}


export default Register;