import { createStore , applyMiddleware} from 'redux';
import reducers from "./reducers";
import thunkMiddleware from 'redux-thunk';

export const initializeStore = (initialState) => {
    return createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
};