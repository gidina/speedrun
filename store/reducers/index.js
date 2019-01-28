import { combineReducers } from 'redux';
import * as gamesReducer from "./games";
import * as runsReducer from "./runs";

const rootReducer = combineReducers({
    games: gamesReducer.default,
    runs: runsReducer.default
});

export default rootReducer;

export const getGames = state => gamesReducer.getGames(state.games);

export const getSelectedGame = (state, id) => {
    const firstRun = runsReducer.getFirstRun(state.runs);
    const game = gamesReducer.getGameById(state.games, id);
    return {
        id: game.id,
        name: game.names.international,
        logoUrl: game.assets['cover-small'].uri,
        firstRun
    }
}