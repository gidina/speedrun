import { 
    FETCH_GAMES_REQUEST, 
    FETCH_GAMES_SUCCESS,
    FETCH_GAMES_ERROR,
    FETCH_RUNS_REQUEST,
    FETCH_RUNS_SUCCESS,
    FETCH_RUNS_ERROR
} from "../actions/actionTypes";

const initialState = {
    loadingGames: false,
    loadingRuns: false
};

const loading = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GAMES_REQUEST:
            return {
                ...state,
                loadingGames: true
            };
        case FETCH_GAMES_SUCCESS:
        case FETCH_GAMES_ERROR:
            return {
                ...state,
                loadingGames: false
            };
        case FETCH_RUNS_SUCCESS:
        case FETCH_RUNS_ERROR:
            return {
                ...state,
                loadingRuns: false
            };
        case FETCH_RUNS_REQUEST:
            return {
                ...state,
                loadingRuns: true
            };
        default:
            return state;
    }
};
  
export default loading;

export const isFetchingGames = state => state.loadingGames;
export const isFetchingRuns = state => state.loadingRuns;