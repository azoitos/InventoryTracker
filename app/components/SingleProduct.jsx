import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSingleProduct } from '../reducers/products.jsx'

export class SingleProduct extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('hello');
        this.props.getSingleProduct(this.props.match.params.id)
    }

    render() {
        console.log('this PRops', this.props);
        const singleProduct = this.props.product;
        console.log(singleProduct);
        return (
            <div>
                <h1>{singleProduct.category}</h1>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        product: state.products[0]
    }
}

export default connect(mapStateToProps, { getSingleProduct })(SingleProduct);
