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

const isValidGame = game => {
    if (!game) {
        return false;
    }

    if (!game.names || !game.names.international) {
        return false;
    }

    if (!game.assets || !game.assets['cover-smalle']) {
        return false;
    }

    return true;
};

const isValidRun = run => {
    if (!run) {
        return false;
    }

    if (!run.players || !run.players[0]) {
        return false;
    }

    if (!run.videos || !run.videos.links || !run.videos.links[0]) {
        return false;
    }

    return true;
};

export const getGames = state => gamesReducer.getGames(state.games);
export const areGamesLoaded = state => gamesReducer.areGamesLoaded(state.games);
export const getRunsUrl = (state, id) => gamesReducer.getRunsUrl(state.games, id);
export const getGameById = (state, id) => gamesReducer.getGameById(state.games, id);
export const getSelectedGame = (state, id) => {
    const firstRun = runsReducer.getFirstRunByGameId(state.runs, id);
    const game = gamesReducer.getGameById(state.games, id);

    if (!isValidGame(game) || !isValidRun(firstRun)) {
        return;
    }

    const firstPlayer = firstRun.players[0];
    const firstPlayerNameOrId = firstPlayer.name ? firstPlayer.name : firstPlayer.id;

    return {
        id,
        name: game.names.international,
        logoUrl: game.assets['cover-small'].uri,
        firstRun: {
            firstPlayerName: firstPlayerNameOrId,
            timePlayed: firstRun.times.primary_t,
            videoUrl: firstRun.videos.links[0].uri
        }
    }
};
export const areRunsLoadedByGameId = (state, id) => runsReducer.areRunsLoadedByGameId(state.runs, id);
export const isFetchingGames = state => loadingReducer.isFetchingGames(state.loading);
export const isFetchingRuns = state => loadingReducer.isFetchingRuns(state.loading);