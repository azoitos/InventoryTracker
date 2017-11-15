import axios from 'axios';

//ACTION TYPES
const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS';
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'


//ACTION CREATOR
export function fetchAllProducts(products) {
    return {
        type: FETCH_ALL_PRODUCTS,
        products
    }
}

export function fetchSingleProduct(product) {
    return {
        type: SINGLE_PRODUCT,
        product
    }
}

export function editProductQuantityAction(product) {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

//REDUCER
const reducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return action.products
        case SINGLE_PRODUCT:
            return [action.product, ...state]
        case EDIT_PRODUCT:{
            let indexOfEl = state.findIndex(prod => prod.id === action.product.id)
            return [
                ...state.slice(0, indexOfEl),
                action.product,
                ...state.slice(indexOfEl + 1)
            ]
        }
        default:
            return state
    }
}

//THUNKS
export function getAllProducts() {
    return dispatch =>
        axios.get('/api/products')
            .then(result => {
                let includeCategories = result.data.map((obj) => {
                    return (
                        Object.assign(obj, { category: obj.category.name })
                    )
                })
                dispatch(fetchAllProducts(includeCategories))
            })
            .catch(e => console.error(e))
}

export function getSingleProduct(id) {
    return dispatch =>
        axios.get(`/api/products/${id}`)
            .then(result => {
                dispatch(fetchSingleProduct(result.data))
            })
            .catch(e => console.error(e))
}

export function decrementProduct(id) {
    return dispatch => axios.delete(`/api/products/${id}/delete`)
        .then((product) => {
            let categoryProduct = Object.assign(product.data, {category: product.data.category.name})

            dispatch(editProductQuantityAction(categoryProduct))
        })
        .catch(e => console.error(e))
    }

export function incrementProduct(id) {
        return dispatch => axios.put(`/api/products/${id}/add`)
            .then((product) => {
                dispatch(editProductQuantityAction(product.data))
            })
            .catch(e => console.error(e))
        }

export default reducer;
