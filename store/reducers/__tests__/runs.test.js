import reducer from "../runs";
import * as types from "../../actions/actionTypes";

describe("Game runs reducer", () => {
    const initialState = {};

    it("Should return initial state", () => {
        const expectedState = initialState;
        expect(reducer(undefined, {})).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_SUCCESS if the game does'nt exist", () => {
        const beforeState = {};
        const action = {
            type: types.FETCH_RUNS_SUCCESS,
            runs: "runs",
            id: "game-id"
        };
        const expectedState = {
            "game-id": "runs"
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_SUCCESS if there ara games in the state and the game recieved is in the state", () => {
        const beforeState = {
            "game-id": "runs-game-1"
        };
        const action = {
            type: types.FETCH_RUNS_SUCCESS,
            runs: "runs-game-3",
            id: "game-id"
        };
        const expectedState = {
            "game-id": "runs-game-3"
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_SUCCESS if there ara games in the state and the game recieved is not in the state", () => {
        const beforeState = {
            "game-id": "runs-game-1"
        };
        const action = {
            type: types.FETCH_RUNS_SUCCESS,
            runs: "runs-game-2",
            id: "game-id-2"
        };
        const expectedState = {
            "game-id": "runs-game-1",
            "game-id-2": "runs-game-2"
        };
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_ERROR", () => {
        const beforeState = {};
        const action = {
            type: types.FETCH_RUNS_ERROR,
            error: "error"
        };
        const expectedState = "error";
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });
});
