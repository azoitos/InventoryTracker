import axios from 'axios';

//ACTION TYPES
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

//ACTION CREATOR
export function getAllCat(categories){
    return {
        type: GET_ALL_CATEGORIES,
        categories
    }
}

//REDUCER
const reducer = (state = [], action) => {
    switch(action.type) {
        case GET_ALL_CATEGORIES:
            return action.categories
        default:
            return state
    }
}

//THUNKS
export function getCategories() {
    return dispatch =>
        axios.get('/api/categories')
            .then(result => dispatch(getAllCat(result.data)))
            .catch(e => console.error(e))
}

export default reducer;
