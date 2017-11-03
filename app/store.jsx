import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.jsx';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            createLogger()
        ))
);

export default store;
