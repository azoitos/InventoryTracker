import React, { Component } from 'react';

import NavigationBar from './NavigationBar.jsx'
import AllProducts from './AllProducts.jsx';

class Home extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <main>
                    <AllProducts />
                </main>
            </div>
        )
    }
}

export default Home;
