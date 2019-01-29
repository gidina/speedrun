import reducer from "../runs";
import * as types from "../../actions/actionTypes";

describe("Game runs reducer", () => {
    const initialState = [];

    it("Should return initial state", () => {
        const expectedState = initialState;
        expect(reducer(undefined, {})).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_SUCCESS", () => {
        const beforeState = [];
        const action = {
            type: types.FETCH_RUNS_SUCCESS,
            runs: "runs"
        };
        const expectedState = "runs";
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle FETCH_RUNS_ERROR", () => {
        const beforeState = [];
        const action = {
            type: types.FETCH_RUNS_ERROR,
            error: "error"
        };
        const expectedState = "error";
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });
});
