import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'

import { getAllProducts } from '../reducers/products.jsx';


class AllProducts extends Component {
    componentDidMount() {
        this.props.getAllProducts();
    }
    render() {
        const products = this.props.products
        return (
            <div>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length ? products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.productId}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, { getAllProducts })(AllProducts);
