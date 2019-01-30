import { FETCH_RUNS_SUCCESS, FETCH_RUNS_ERROR } from "../actions/actionTypes";

const initialState = {};
  
const runs = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RUNS_SUCCESS: {
            const { id, runs } = action;
            return {
                ...state,
                [id]: runs
            }
        } 
        case FETCH_RUNS_ERROR:
            return action.error;
        default:
            return state;
    }
};
  
export default runs;

export const getFirstRunByGameId = (state, id) => {
    const gameRuns = state[id];
    if (!gameRuns) return;

    return gameRuns[0];
};
export const areRunsLoadedByGameId = (state, id) => !!state[id];