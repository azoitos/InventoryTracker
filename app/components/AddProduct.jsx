import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewProduct } from '../reducers/products.jsx';

class AddProduct extends Component {
    constructor(props) {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        const addProduct = this.props.addNewProduct;
        event.preventDefault();
        const newProduct = {
            productId: event.target.productId.value,
            description: event.target.description.value,
            category: event.target.category.value,
            quantity: event.target.quantity.value,
            price: event.target.price.value,
        }
        addProduct(newProduct);
        event.target.productId.value = '';
        event.target.description.value = '';
        event.target.category.value = '';
        event.target.quantity.value = '';
        event.target.price.value = '';
        event.target.placeholder = '';
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="list-group-item">
                <div className="row">
                    <div className="input-field col s8">
                        <input
                            name="productId"
                            type="text"
                            className="form-like large-font"
                            placeholder="Product ID"
                        />
                        <input
                            name="description"
                            type="text"
                            className="form-like large-font"
                            placeholder="Product Description"
                        />
                        <input
                            name="category"
                            type="text"
                            className="form-like large-font"
                            placeholder="Product Category"
                        />
                        <input
                            name="quantity"
                            type="text"
                            className="form-like large-font"
                            placeholder="Product Quantity"
                        />
                        <input
                            name="price"
                            type="text"
                            className="form-like large-font"
                            placeholder="Product Price"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-warning btn-xs">
                    <span className="glyphicon glyphicon-plus" />SUBMIT
                </button>
            </form>
        )
    }
}

export default connect(null, { addNewProduct })(AddProduct)
