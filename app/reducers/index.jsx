import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    products: require('./products.jsx').default,
    auth: require('./auth.jsx').default,
    categories: require('./categories.jsx').default,
    sales: require('./salesReport.jsx').default
})

export default rootReducer;

