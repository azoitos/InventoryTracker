import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewExpense } from '../reducers/expenseReport.jsx'

class AddExpense extends Component {
    constructor(props) {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        const addExpense = this.props.addNewExpense;
        event.preventDefault();
        const newExpense = {
            type: event.target.type.value,
            description: event.target.description.value,
            amount: event.target.amount.value,
        }
        addExpense(newExpense);
        event.target.type.value = '';
        event.target.description.value = '';
        event.target.amount.value = '';
        event.target.placeholder = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="list-group-item">
                <div className="row add-product-row">
                    <div className="input-field col s8 add-product-col">
                        <input
                            name="type"
                            type="text"
                            className="form-like large-font"
                            placeholder="Expense Type"
                        />
                        <input
                            name="description"
                            type="text"
                            className="form-like large-font"
                            placeholder="Expense Description"
                        />
                        <input
                            name="amount"
                            type="text"
                            className="form-like large-font"
                            placeholder="Expense Amount"
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

export default connect(null, { addNewExpense })(AddExpense);
