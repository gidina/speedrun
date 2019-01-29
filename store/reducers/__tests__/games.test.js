import reducer from "../games";
import * as types from "../../actions/actionTypes";

describe("Games reducer", () => {
    const initialState = [];

    it("Should return initial state", () => {
        const expectedState = initialState;
        expect(reducer(undefined, {})).toEqual(expectedState);
    });

    it("should handle FETCH_GAMES_SUCCESS", () => {
        const beforeState = [];
        const action = {
            type: types.FETCH_GAMES_SUCCESS,
            games: "games"
        };
        const expectedState = "games";
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_GAMES_ERROR", () => {
        const beforeState = [];
        const action = {
            type: types.FETCH_GAMES_ERROR,
            error: "error"
        };
        const expectedState = "error";
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });
});
