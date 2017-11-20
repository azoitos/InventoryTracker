import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux';

import { updateProduct } from '../reducers/products.jsx'


export class EditProduct extends Component {
    constructor(props) {
        super(props);

    }

    editProduct(event) {
        this.setState({
            description: event.target.value,
            quantity: event.target.value,
            price: event.target.value,
            productId: event.target.value
        })
    }

    onSubmit(event) {
        const singleProduct = this.props.product
        event.preventDefault();
        const updatedProduct = {
            description: event.target.description.value || singleProduct.description,
            quantity: event.target.quantity.value || singleProduct.quantity,
            price: event.target.price.value || singleProduct.price
        }
        this.props.updateProduct(singleProduct.productId, updatedProduct);
        event.target.description.value = '';
        event.target.quantity.value = '';
        event.target.price.value = '';
    }

    render() {
        return (
            <form>
                <Panel header={`Product # `} bsStyle="info">
                    <div>Item:
                    <input
                            type="text"
                            value={this.state.description}
                            onChange={this.editProduct} />
                    </div>
                    <div>Quantity:
                    <input
                            type="text"
                            value={this.state.quantity}
                            onChange={this.editProduct} />
                    </div>
                    <div>Price:
                    <input
                            type="text"
                            value={this.state.price}
                            onChange={this.editProduct} />
                    </div>
                    <button
                        onClick={this.onSubmit}
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

export default connect(mapStateToProps, { updateProduct })(EditProduct)
