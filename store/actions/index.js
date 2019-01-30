import fetch from 'isomorphic-unfetch';
import { 
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS, 
    FETCH_GAMES_ERROR,
    FETCH_RUNS_REQUEST,
    FETCH_RUNS_SUCCESS, 
    FETCH_RUNS_ERROR 
} from "./actionTypes";
import { areGamesLoaded, getRunsUrl, areRunsLoadedByGameId } from "../reducers";

const fetchGamesRequest = () => ({ type: FETCH_GAMES_REQUEST });
const fetchGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, games });
const fetchGamesError = error => ({ type: FETCH_GAMES_ERROR, error });

export const onHomePageEnter = () => {
    return async (dispatch, getState) => {

        const games = getState().games;
        if (games.length !== 0) return;

        dispatch(fetchGamesRequest());

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

const fetchRunsRequest = () => ({ type: FETCH_RUNS_REQUEST });
const fetchRunsSuccess = (id, runs) => ({ type: FETCH_RUNS_SUCCESS, runs, id });
const fetchRunsError = error => ({ type: FETCH_RUNS_ERROR, error });

// const doFetchUrl = (url) => {
//     return new Promise(resolve => setTimeout(() => fetch(url).then(resolve), 3000))
// }

const fetchRuns = (id, url) => {
    return async (dispatch, getState) => {
        
        if (areRunsLoadedByGameId(getState(), id)) return;

        dispatch(fetchRunsRequest());
        
        try {
            const res = await fetch(url);
            // const res = await doFetchUrl(url);
            const result = await res.json();
            const runs = result.data;
            dispatch(fetchRunsSuccess(id, runs));
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
        await dispatch(fetchRuns(id, runsUrl));
    };
}