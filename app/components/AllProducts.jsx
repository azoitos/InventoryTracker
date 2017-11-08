import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import SearchBar from './SearchBar.jsx'
import { getAllProducts } from '../reducers/products.jsx';


class AllProducts extends Component {

    componentDidMount() {
        this.props.getAllProducts();
    }

    render() {
        const products = this.props.products
        const { locale } = this.context;
        return (
            <div>
                <SearchBar />
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>View Item</th>
                            <th>ProductId</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Add to Quantity</th>
                            <th>Remove Item</th>
                            <th>Add to Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length ? products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td>
                                        <NavLink to={`/products/${product.id}`}><Button>View Product</Button></NavLink>
                                    </td>
                                    <td>{product.productId}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td><Button>+</Button></td>
                                    <td><Button>-</Button></td>
                                    <td><Button>$+</Button></td>
                                </tr>
                            )
                        }) :
                            <tr>
                                <th>Loading...</th>
                                <th>Loading...</th>
                                <th>Loading...</th>
                                <th>Loading...</th>
                                <th>Loading...</th>
                            </tr>}
                    </tbody>
                </Table>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return { products: state.products }
}

export default connect(mapStateToProps, { getAllProducts })(AllProducts);
