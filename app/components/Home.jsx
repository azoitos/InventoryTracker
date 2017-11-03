import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import { whoami } from '../reducers/auth.jsx'

import NavigationBar from './NavigationBar.jsx'
import AllProducts from './AllProducts.jsx';
import SingleProduct from './SingleProduct.jsx';
import Login from './Login.jsx';
import Sales from './Sales.jsx';
import Expenses from './Expenses.jsx';

class Home extends Component {
    componentDidMount() {
        this.props.whoami();
    }
    render() {
        return (
            <div>
                <NavigationBar />
                <main>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/products" component={AllProducts} />
                        <Route path="/products/:id" component={SingleProduct} />
                        <Route path="/sales" component={Sales} />
                        <Route path="/expenses" component={Expenses} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default connect(null, { whoami })(Home);

