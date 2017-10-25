import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    products: require('./products.jsx').default
})

export default rootReducer;

