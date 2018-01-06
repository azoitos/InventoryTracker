import axios from 'axios';
import * as actions from '../action-types/products.jsx'

//ACTION CREATOR
export function fetchAllProducts(products) {
    return {
        type: actions.FETCH_ALL_PRODUCTS,
        products
    }
}

export function fetchSingleProduct(product) {
    return {
        type: actions.SINGLE_PRODUCT,
        product
    }
}

export function addProduct(product) {
    return {
        type: actions.ADD_PRODUCT,
        product
    }
}

export function removeProduct(id) {
    return {
        type: actions.REMOVE_PRODUCT,
        id
    }
}

export function editProduct(product) {
    return {
        type: actions.EDIT_PRODUCT,
        product
    }
}

export function editProductQuantityAction(product) {
    return {
        type: actions.EDIT_QUANITY,
        product
    }
}

//REDUCER
const reducer = (state = [], action) => {
    switch (action.type) {
        case actions.FETCH_ALL_PRODUCTS:
            return action.products
        case actions.SINGLE_PRODUCT:
            return [action.product]
        case actions.ADD_PRODUCT:
            return [...state, action.product]
        case actions.REMOVE_PRODUCT:
            return state.filter(product => product.productId !== action.id)
        case actions.EDIT_PRODUCT:
            return [Object.assign(state[0], action.product.product)]
        case actions.EDIT_QUANITY: {
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

export function getSingleProduct(productId) {
    return dispatch =>
        axios.get(`/api/products/${productId}`)
            .then(result => {
                let includeCategory = Object.assign(result.data, {category: result.data.category.name})
                dispatch(fetchSingleProduct(includeCategory))
            })
            .catch(e => console.error(e))
}

export function addNewProduct(product) {
    return dispatch =>
        axios.post('/api/products', product)
            .then(result => {
                axios.get(`/api/categories/${result.data.categoryId}`)
                    .then(category => {
                        let editedResult = Object.assign(result.data, { category: category.data.name })
                        dispatch(addProduct(editedResult))
                    })
            })
            .catch(e => console.error(e))
}

export function deleteProduct(productId) {
    return dispatch => {
        dispatch(removeProduct(productId));
        axios.delete(`/api/products/${productId}`)
            .catch((e) => console.error(e))
    }
}

export function updateProduct(productId, product) {
    return dispatch =>
        axios.put(`/api/products/${productId}`, product)
            .then(updatedProduct => {
                dispatch(editProduct(updatedProduct.data))
            })
            .catch(e => console.error(e));
}

export function decrementProduct(id) {
    return dispatch => axios.delete(`/api/products/${id}/delete`)
        .then((product) => {
            let categoryProduct = Object.assign(product.data, { category: product.data.category.name })

            dispatch(editProductQuantityAction(categoryProduct))
        })
        .catch(e => console.error(e))
}

export function incrementProduct(id) {
    return dispatch => axios.put(`/api/products/${id}/add`)
        .then((product) => {
            let categoryProduct = Object.assign(product.data, { category: product.data.category.name })

            dispatch(editProductQuantityAction(categoryProduct))

        })
        .catch(e => console.error(e))
}

export default reducer;
