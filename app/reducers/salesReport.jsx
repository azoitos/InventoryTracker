import axios from 'axios';

//Action Type
const GET_ALL_SALES = 'GET_ALL_SALES'
const ADD_TO_SALES_REPORT = 'ADD_TO_SALES_REPORT';

//Action
export function getSales(soldProducts) {
    return {
        type: GET_ALL_SALES,
        soldProducts
    }
}

export function addToSalesReport(soldProduct) {
    return {
        type: ADD_TO_SALES_REPORT,
        soldProduct
    }
}

//Reducer
const reducer = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_SALES:
            return action.soldProducts
        case ADD_TO_SALES_REPORT:
            return [...state, action.soldProduct];
        default:
            return state
    }
}

//Thunks
export function getAllSales() {
    return dispatch => {
        axios.get('/api/salesReport')
            .then(result => {
                dispatch(getSales(result.data))
            })
            .catch(e => console.error(e))
    }
}

export function addToSales(product) {
    return dispatch =>
        axios.post('/api/salesReport', product)
            .then(result => {
                axios.get(`/api/categories/${result.data.categoryId}`)
                    .then(category => {
                        let editedResult = Object.assign(result.data, { category: category.data.name })
                        dispatch(addToSalesReport(editedResult))
                    })
            })
            .catch(e => console.error(e))
}

export default reducer;