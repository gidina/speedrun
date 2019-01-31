import reducer from "../loading";
import * as types from "../../actions/actionTypes";

describe("Loading reducer", () => {
    const initialState = {
        loadingGames: false,
        loadingRuns: false
    };

    it("Should return initial state", () => {
        const expectedState = initialState;
        expect(reducer(undefined, {})).toEqual(expectedState);
    });

    it("should handle FETCH_GAMES_REQUEST", () => {
        const beforeState = initialState;
        const action = { type: types.FETCH_GAMES_REQUEST };
        const expectedState = {
            loadingGames: true,
            loadingRuns: false
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_GAMES_SUCCESS", () => {
        const beforeState = {
            loadingGames: true,
            loadingRuns: false
        };
        const action = { type: types.FETCH_GAMES_SUCCESS };
        const expectedState = {
            loadingGames: false,
            loadingRuns: false
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_GAMES_ERROR", () => {
        const beforeState = {
            loadingGames: true,
            loadingRuns: false
        };
        const action = { type: types.FETCH_GAMES_ERROR };
        const expectedState = {
            loadingGames: false,
            loadingRuns: false
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_REQUEST", () => {
        const beforeState = initialState;
        const action = { type: types.FETCH_RUNS_REQUEST };
        const expectedState = {
            loadingGames: false,
            loadingRuns: true
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_SUCCESS", () => {
        const beforeState = {
            loadingGames: false,
            loadingRuns: true
        };
        const action = { type: types.FETCH_RUNS_SUCCESS };
        const expectedState = {
            loadingGames: false,
            loadingRuns: false
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_ERROR", () => {
        const beforeState = {
            loadingGames: false,
            loadingRuns: true
        };
        const action = { type: types.FETCH_RUNS_ERROR };
        const expectedState = {
            loadingGames: false,
            loadingRuns: false
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });
});
