import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    products: require('./products.jsx').default,
    auth: require('./auth.jsx').default,
    search: require('./search.jsx').default
})

export default rootReducer;

