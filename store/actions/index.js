import fetch from 'isomorphic-unfetch';
import { 
    FETCH_GAMES_SUCCESS, 
    FETCH_GAMES_ERROR,
    FETCH_RUNS_SUCCESS, 
    FETCH_RUNS_ERROR 
} from "./actionTypes";
import { areGamesLoaded, getRunsUrl } from "../reducers";

const fetchGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, games });
const fetchGamesError = error => ({ type: FETCH_GAMES_ERROR, error });

export const onHomePageEnter = () => {
    return async (dispatch, getState) => {
        
        const games = getState().games;
        if (games.length !== 0) return;
        
        try {
            const res = await fetch('https://www.speedrun.com/api/v1/games');
            const result = await res.json();
            const games = result.data;
            dispatch(fetchGamesSuccess(games));
        } catch(err) {
            dispatch(fetchGamesError(err));
        }
    };
};

const fetchRunsSuccess = runs => ({ type: FETCH_RUNS_SUCCESS, runs });
const fetchRunsError = error => ({ type: FETCH_RUNS_ERROR, error });

export const fetchRuns = (url) => {
    return async (dispatch, getState) => {
        
        const runs = getState().runs;
        if (runs.length !== 0) return;
        
        try {
            const res = await fetch(url);
            const result = await res.json();
            const runs = result.data;
            dispatch(fetchRunsSuccess(runs));
        } catch(err) {
            dispatch(fetchRunsError(err));
        }
    };
};

export const fetchGamesAndRuns = id => {
    return async (dispatch, getState) => {
        
        if (!areGamesLoaded(getState())) {
            await dispatch(onHomePageEnter());
        }

        const runsUrl = getRunsUrl(getState(), id);
        await dispatch(fetchRuns(runsUrl));
    };
}