import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import { getAllProducts, fetchFilteredProduct } from '../reducers/products.jsx';
import DropdownButton from './common/DropdownButton'


class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filter: 'ProductId'
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this)
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value
        }, () => this.props.fetchFilteredProduct(this.state.search, this.state.filter))
    }

    componentDidMount() {
        this.props.getAllProducts();
    }

    onDropdownChange(event) {
        this.setState({
            filter: event.target.value
        })
    }
    render() {
        const products = this.props.products
        const { locale } = this.context;
        return (
            <div>
                <input
                    type="text"
                    value={this.state.search}
                    onChange={this.updateSearch} />
                <DropdownButton onDropdownChange={this.onDropdownChange} />
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

export default connect(mapStateToProps, { getAllProducts, fetchFilteredProduct })(AllProducts);
