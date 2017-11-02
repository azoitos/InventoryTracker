import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../reducers/auth.jsx'

export const Login = (props) => (
    <form onSubmit={evt => {
        evt.preventDefault();
        props.loginHandler(evt.target.username.value, evt.target.password.value)
    }}>
        <input name="username" placeholder="username" />
        <input name="password" type="password" placeholder="password" />
        <input type="submit" value="Login" />
    </form>
)

function mapDispatchToProps(dispatch) {
    return {
        loginHandler() {
            dispatch(login());
        }
    }
}

export default connect(state => ({}), mapDispatchToProps)(Login)

