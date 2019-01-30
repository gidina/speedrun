import { combineReducers } from 'redux';
import * as gamesReducer from "./games";
import * as runsReducer from "./runs";
import * as loadingReducer from "./loading";

const rootReducer = combineReducers({
    games: gamesReducer.default,
    runs: runsReducer.default,
    loading: loadingReducer.default
});

export default rootReducer;

export const getGames = state => gamesReducer.getGames(state.games);
export const areGamesLoaded = state => gamesReducer.areGamesLoaded(state.games);
export const getRunsUrl = (state, id) => gamesReducer.getRunsUrl(state.games, id);
export const getGameById = (state, id) => gamesReducer.getGameById(state.games, id);
export const getSelectedGame = (state, id) => {
    const firstRun = runsReducer.getFirstRun(state.runs);
    const game = gamesReducer.getGameById(state.games, id);

    if (!firstRun || !game) {
        return;
    }

    return {
        id,
        name: game.names.international,
        logoUrl: game.assets['cover-small'].uri,
        firstRun
    }
};
export const isFetchingGames = state => loadingReducer.isFetchingGames(state.loading);
export const isFetchingRuns = state => loadingReducer.isFetchingRuns(state.loading);