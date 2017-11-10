import axios from 'axios';

//ACTION TYPES
const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS';
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'
const FILTER_PRODUCT = 'FILTER_PRODUCT'

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

export function fetchFilteredProduct(filteredProduct) {
    return {
        type: FILTER_PRODUCT,
        filteredProduct
    }
}


//REDUCER
const reducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return action.products
        case SINGLE_PRODUCT:
            return [action.product, ...state]
        case FILTER_PRODUCT:
            return state.filter(product => {
                return product.description.toLowerCase().includes(action.filteredProduct.toLowerCase());
            })
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

export default reducer;
