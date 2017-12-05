import React from 'react';
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Login from './Login.jsx'

export const NavigationBar = (props) => {
    return (
        <div className="navbar">
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">MyInventoryTracker</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/products">Products</NavItem>
                        <NavItem eventKey={2} href="/sales">Sales</NavItem>
                        <NavItem eventKey={3} href="/expenses">Expenses</NavItem>
                    </Nav>
                    <Nav pullRight={true}>
                        <Login />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth
    }
}
export default connect(mapStateToProps, null)(NavigationBar)
