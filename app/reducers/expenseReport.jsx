import axios from 'axios';

//Action Type
const GET_EXPENSES = 'GET_EXPENSES';
const ADD_EXPENSE = 'ADD_EXPENSES';

//ACTION CREATOR
const getExpenses = function (expenses) {
    return {
        type: GET_EXPENSES,
        expenses
    }
}

const addExpense = function (expense) {
    return {
        type: ADD_EXPENSE,
        expense
    }
}

//REDUCER
const reducer = (state = [], action) => {
    switch (action.type) {
        case GET_EXPENSES:
            return action.expenses;
        case ADD_EXPENSE:
            return [...state, action.expense]
        default:
            return state
    }
}

export function getAllExpenses() {
    return dispatch =>
        axios.get('/api/expenseReport')
            .then(result => {
                dispatch(getExpenses(result.data))
            })
            .catch(e => console.error(e));
}

export function addNewExpense(expense) {
    return dispatch =>
        axios.post('/api/expenseReport', expense)
            .then(newExpense => {
                dispatch(addExpense(newExpense.data))
            })
            .catch(e => console.error(e));
}

export default reducer;