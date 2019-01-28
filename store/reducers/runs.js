import { FETCH_RUNS_SUCCESS, FETCH_RUNS_ERROR } from "../actions/actionTypes";

const initialState = [];
  
const runs = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RUNS_SUCCESS: {
            return action.runs;
        } 
        case FETCH_RUNS_ERROR:
            return action.error;
        default:
            return state;
    }
};
  
export default runs;

export const getFirstRun = state => state[0];