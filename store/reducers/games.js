import { FETCH_GAMES_SUCCESS, FETCH_GAMES_ERROR } from "../actions/actionTypes";

const initialState = [];
  
const games = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GAMES_SUCCESS:
            return action.games;
        case FETCH_GAMES_ERROR:
            return action.error;
        default:
            return state;
    }
};
  
export default games;

const findByID = (obj, id) => obj.id === id;
export const getGames = state => state;
export const getGameById = (state, id) => {
    return state.find((game) => findByID(game, id))
};