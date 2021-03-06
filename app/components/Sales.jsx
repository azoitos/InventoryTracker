import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { getAllSales } from '../reducers/salesReport.jsx'

class Sales extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllSales();
    }

    render() {
        const { sales } = this.props;
        return (
            <div>
                <h1>SALES REPORT</h1>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length ? sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.product.productId}</td>
                                    <td>{sale.product.description}</td>
                                    <td>{sale.quantity}</td>
                                    <td>{sale.product.price}</td>
                                    <td>{(sale.product.price * sale.quantity).toFixed(2)}</td>
                                </tr>
                            )
                        }) :
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        sales: state.sales
    }
}

export default connect(mapStateToProps, { getAllSales })(Sales)
