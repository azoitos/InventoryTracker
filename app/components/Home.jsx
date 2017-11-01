import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './NavigationBar.jsx'
import AllProducts from './AllProducts.jsx';
import SingleProduct from './SingleProduct.jsx';
import LoginSignup from './LoginSignup.jsx';
import Sales from './Sales.jsx';
import Expenses from './Expenses.jsx';

class Home extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <main>
                    <Switch>
                        <Route exact path="/" component={LoginSignup} />
                        <Route path="/products" component={AllProducts} />
                        <Route path="/products/:id" component={SingleProduct} />
                        <Route path="/sales" component={Sales} />
                        <Route path="/expenses" component={Expenses} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default Home;
