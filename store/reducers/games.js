const initialState = [];
  
const games = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_GAMES_SUCCESS':
            return action.games;
        default:
            return state;
    }
};
  
export default games;