import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewProduct } from '../reducers/products.jsx';
import { getCategories } from '../reducers/categories.jsx'

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
            categoryId: event.target.category.value,
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

    componentDidMount() {
        this.props.getCategories();
    }
    
    render() {
        const categories = this.props.categories
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
                        <select name="category">
                            {
                                categories.length && categories.map(category => {
                                    console.log('category', category)
                                    return (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                })
                            }
                        </select>
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

function mapStateToProps(state) {
    return {
        products: state.products,
        categories: state.categories
    }
}

export default connect(mapStateToProps, { addNewProduct, getCategories })(AddProduct)
