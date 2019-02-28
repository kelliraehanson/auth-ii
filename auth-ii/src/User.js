import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';


const User = props => {
    console.log(props.id);
  return (
      <NavLink className="user" to={'/api/users'}>
    
      <h3>Name: {props.name}</h3>
      <p>Password: {props.password}</p>

      </NavLink>
    
  );
};

User.defaultProps = {
    name: '',
    password: ''
  };


  export default User;