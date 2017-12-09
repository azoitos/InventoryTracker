import React, { Component } from 'react';
import { Panel, TextInput } from 'react-bootstrap'
import { connect } from 'react-redux';

import { getSingleProduct, deleteProduct, updateProduct } from '../reducers/products.jsx'
import EditProduct from './EditProduct.jsx';

export class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        }
        this.editModeChange = this.editModeChange.bind(this)
    }

    editModeChange() {
        this.setState({
            editMode: false
        })
    }

    componentDidMount() {
        this.props.getSingleProduct(this.props.match.params.productId)
    }

    render() {
        const singleProduct = this.props.product;
        const removeProduct = this.props.deleteProduct
        if (this.state.editMode) return <EditProduct props={this.props} history={history} editModeChange={this.editModeChange} />
        return (
            singleProduct ?
                <div>
                    <Panel header={`Product # ${singleProduct.productId}`} bsStyle="info">
                        <div>Item: {singleProduct.description}</div>
                        <div>Category: {singleProduct.category}</div>
                        <div>Quantity: {singleProduct.quantity}</div>
                        <div>Price: {singleProduct.price}</div>
                        <button
                            onClick={() => {
                                let result = confirm('Are you sure you want to delete this product?');
                                if (result) {
                                    removeProduct(singleProduct.productId)
                                    this.props.history.push('/products')
                                }
                            }}
                            type="submit"
                            className="btn btn-warning btn-xs remove-button">
                            <span className="glyphicon glyphicon-remove" /> Delete Product
                        </button>
                        <button
                            onClick={() => this.setState({ editMode: true })}
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
    return {
        product: state.products[0],
    }
}

export default connect(mapStateToProps, { getSingleProduct, deleteProduct })(SingleProduct);
