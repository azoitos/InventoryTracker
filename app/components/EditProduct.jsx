import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux';

import { updateProduct } from '../reducers/products.jsx'


export class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.product.description,
            quantity: this.props.product.quantity,
            price: this.props.product.price,
            productId: this.props.product.productId
        }
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(event) {
        const product = this.props.product
        event.preventDefault();
        const updatedProduct = {
            description: event.target.description.value || product.description,
            quantity: event.target.quantity.value || product.quantity,
            price: event.target.price.value || product.price
        }
        this.props.promisedUpdateProduct(product.productId, updatedProduct)
            .then(() => {
                console.log('product state', this.props.product);
                this.props.editModeChange();
            })
        event.target.description.value = '';
        event.target.quantity.value = '';
        event.target.price.value = '';
    }

    render() {
        const product = this.props.product
        return (
            <form onSubmit={this.onSubmit} >
                <Panel header={`Product # ${product.productId}`} bsStyle="info">
                    <div>Item:
                    <input
                            type="text"
                            name="description"
                            placeholder={product.description} />
                    </div>
                    <div>Quantity:
                    <input
                            type="text"
                            name="quantity"
                            placeholder={product.quantity} />
                    </div>
                    <div>Price:
                    <input
                            type="text"
                            name="price"
                            placeholder={product.price} />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-info btn-xs">
                        <span className="glyphicon glyphicon-plus" /> Submit Change
                </button>
                </Panel>
            </form >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.products[0],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        promisedUpdateProduct: (productId, updatedProduct) => {
            return Promise.resolve(dispatch(updateProduct(productId, updatedProduct)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
