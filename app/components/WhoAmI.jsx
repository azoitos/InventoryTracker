import React from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/auth.jsx';

export const WhoAmI = (props) => (
    <div className="whoami">
        <Link to="/profile"><span className="whoami-user-name">My Profile</span></Link>
        <button className="logout" onClick={props.logout}>Logout</button>
    </div>
)


export default connect(({ auth }) => ({ user: auth }), { logout })(WhoAmI)
