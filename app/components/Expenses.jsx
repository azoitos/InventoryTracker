import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap';
import { getAllExpenses } from '../reducers/expenseReport.jsx';

import AddExpense from './AddExpense.jsx'

class Expenses extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllExpenses();
    }

    render() {
        const { expenses } = this.props
        return (
            <div>
                <h1>EXPENSE REPORT</h1>
                <div md={6} className="add-product"><h3>Add New Expense</h3><AddExpense /></div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Expense Type</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length ? expenses.map(expense => {
                            return (
                                <tr key={expense.id}>
                                    <td>{expense.type}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.amount}</td>
                                </tr>
                            )
                        }) :
                            <tr>
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
        expenses: state.expenses
    }
}

export default connect(mapStateToProps, { getAllExpenses })(Expenses);
