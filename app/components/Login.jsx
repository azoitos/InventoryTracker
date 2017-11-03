import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../reducers/auth.jsx'

export const Login = (props) => {
    console.log(props.user.email);
    return (
        <div>
            {props.user.email ?
                <div><h1>Logged in as: {props.user.email}</h1></div>
                : <form onSubmit={evt => {
                    evt.preventDefault();
                    props.loginHandler(evt.target.email.value, evt.target.password.value)
                }}>
                    <input name="email" placeholder="email" />
                    <input name="password" type="password" placeholder="password" />
                    <input type="submit" value="Login" />
                </form>}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginHandler(email, password) {
            dispatch(login(email, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

