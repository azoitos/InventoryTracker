import React, { Component } from 'react';
import { Panel, TextInput } from 'react-bootstrap'
import { connect } from 'react-redux';

import { getSingleProduct, deleteProduct, updateProduct } from '../reducers/products.jsx'

export class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.product.description,
            quantity: this.props.product.quantity,
            price: this.props.product.price
        }
        this.updateSearch = this.updateSearch.bind(this);
        // this.renderUpdateProductForm = this.renderUpdateProductForm.bind(this);
    }

    componentDidMount() {
        this.props.getSingleProduct(this.props.match.params.productId)
    }

    updateSearch(event) {
        this.setState({
            description: event.target.value,
            quantity: event.target.value,
            price: event.target.value
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

    renderUpdateProductForm() {
        const singleProduct = this.props.product
        return (
            <div>
                <Panel header={`Product # ${singleProduct.productId}`} bsStyle="info">
                    <div>Item:
                        <input
                            type="text"
                            value={this.state.description}
                            onChange={this.updateSearch} />
                    </div>
                    <div>Quantity:
                        <input
                            type="text"
                            value={this.state.quantity}
                            onChange={this.updateSearch} />
                    </div>
                    <div>Price:
                        <input
                            type="text"
                            value={this.state.price}
                            onChange={this.updateSearch} />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-info btn-xs">
                        <span className="glyphicon glyphicon-plus" /> Submit Change
                    </button>
                </Panel>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.products[0],
    }
}

export default connect(mapStateToProps, { getSingleProduct, deleteProduct, updateProduct })(SingleProduct);
