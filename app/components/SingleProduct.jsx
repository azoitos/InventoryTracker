import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSingleProduct } from '../reducers/products.jsx'

export class SingleProduct extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSingleProduct(this.props.match.params.id)
    }

    render() {
        const singleProduct = this.props.product;
        return (
            <div>
                <h1>Item:{singleProduct.description}</h1>
                <h3>Quantity:{singleProduct.quantity}</h3>
                <h3>Price:{singleProduct.price}</h3>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        product: state.products[0]
    }
}

export default connect(mapStateToProps, { getSingleProduct })(SingleProduct);
