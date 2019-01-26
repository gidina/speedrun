import { FETCH_GAMES_SUCCESS } from "./actionTypes";

export const fetchGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, games });