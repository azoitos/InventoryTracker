import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    products: require('./products.jsx').default,
    auth: require('./auth').default
})

export default rootReducer;

