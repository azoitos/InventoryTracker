import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../reducers/auth.jsx'

export const Login = (props) => (
    <form onSubmit={evt => {
        // console.dir(evt);
        evt.preventDefault();
        props.loginHandler(evt.target.email.value, evt.target.password.value)
    }}>
        <input name="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input type="submit" value="Login" />
    </form>
)

function mapDispatchToProps(dispatch) {
    return {
        loginHandler(email, password) {
            dispatch(login(email, password));
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)

