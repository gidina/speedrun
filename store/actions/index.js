import fetch from 'isomorphic-unfetch';
import { FETCH_GAMES_SUCCESS, FETCH_GAMES_ERROR } from "./actionTypes";

const fetchGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, games });
const fetchGamesError = error => ({ type: FETCH_GAMES_ERROR, error });

export const fetchGames = () => {
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