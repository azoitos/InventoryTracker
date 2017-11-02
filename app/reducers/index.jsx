import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    products: require('./products.jsx').default,
    auth: require('./auth.jsx').default
})

export default rootReducer;

