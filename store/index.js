import { createStore } from 'redux';
import reducers from "./reducers";

export const initializeStore = (initialState) => {
    return createStore(reducers, initialState);
};