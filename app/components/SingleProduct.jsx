import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux';

import { getSingleProduct, deleteProduct } from '../reducers/products.jsx'

export class SingleProduct extends Component {

    componentDidMount() {
        this.props.getSingleProduct(this.props.match.params.productId)
    }

    render() {
        const singleProduct = this.props.product;
        const removeProduct = this.props.deleteProduct
        return (
            singleProduct ?
                <div>
                    <Panel header={`Product # ${singleProduct.productId}`} bsStyle="info">
                        <div>Item: {singleProduct.description}</div>
                        <div>Quantity: {singleProduct.quantity}</div>
                        <div>Price: {singleProduct.price}</div>
                        <button
                            onClick={() => {
                                removeProduct(singleProduct.productId)
                                this.props.history.push('/products')
                            }}
                            type="submit"
                            className="btn btn-warning btn-xs remove-button">
                            <span className="glyphicon glyphicon-remove" /> Delete Product
                    </button>
                        <button
                            type="submit"
                            className="btn btn-info btn-xs">
                            <span className="glyphicon glyphicon-plus" /> Edit Product
                    </button>
                    </Panel>
                </div >
                :
                <div>Loading Single Product</div>
        )

    }
}

const mapStateToProps = (state) => {
    console.log('STATE', state);
    return {
        product: state.products[0],
    }
}

export default connect(mapStateToProps, { getSingleProduct, deleteProduct })(SingleProduct);
