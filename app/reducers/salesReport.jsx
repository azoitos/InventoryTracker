import axios from 'axios';

//Action Type
const GET_ALL_SALES = "GET_ALL_SALES"
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
        case ADD_TO_SALES_REPORT:
            return [...state, action.soldProduct];
        default:
            return state
    }
}

//Thunks
export function getAllSales() {
    return dispatch => {
        axios.get('/api/products/salesReport')
            .then(result => {
                let includeCategories = result.data.map((obj) => {
                    return (
                        Object.assign(obj, { category: obj.category.name })
                    )
                })
                dispatch(getSales(includeCategories))
            })
            .catch(e => console.error(e))
    }
}

export function addToSales(product) {
    return dispatch =>
        axios.post('/api/products/salesReport', product)
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