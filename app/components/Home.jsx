import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { whoami } from '../reducers/auth.jsx'

import NavigationBar from './NavigationBar.jsx'
import AllProducts from './AllProducts.jsx';
import SingleProduct from './SingleProduct.jsx';
import Landing from './Landing.jsx';
import Sales from './Sales.jsx';
import Expenses from './Expenses.jsx';

import en from '../locales/en.json';
import jp from '../locales/jp.json';

const locales = { en, jp }

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
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/products" component={AllProducts} />
                        <Route path="/products/:productId" component={SingleProduct} />
                        <Route path="/sales" component={Sales} />
                        <Route path="/expenses" component={Expenses} />
                    </Switch>
                </main>
            </div>
        )
    }
}


export default withRouter(connect(null, { whoami })(Home));

