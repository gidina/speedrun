import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchGames, fetchByUrl } from "../../../commons/apiCalls";
import * as actions from '../index';
import * as types from '../actionTypes';
import { areGamesLoaded, getRunsUrl, areRunsLoadedByGameId } from "../../reducers";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const state = {};
const store = mockStore(state);

jest.mock("../../reducers");
jest.mock("../../../commons/apiCalls");

beforeEach(() => {
  store.clearActions();
  jest.clearAllMocks();
})

describe("#onHomePageEnter", () => {
  it('should create expected actions when fetch succeed', async () => {
    fetchGames.mockResolvedValue("games");
    areGamesLoaded.mockReturnValue(false);

    const expectedActions = [
      { type: types.FETCH_GAMES_REQUEST },
      { type: types.FETCH_GAMES_SUCCESS, games: "games" }
    ];
  
    await store.dispatch(actions.onHomePageEnter());
    
    expect(fetchGames).toBeCalledTimes(1);
    expect(fetchGames).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create expected actions when fetch fails', async () => {
    fetchGames.mockRejectedValue("error-message");
    areGamesLoaded.mockReturnValue(false);

    const expectedActions = [
      { type: types.FETCH_GAMES_REQUEST },
      { type: types.FETCH_GAMES_ERROR, error: "error-message" }
    ];
  
    await store.dispatch(actions.onHomePageEnter());
    
    expect(fetchGames).toBeCalledTimes(1);
    expect(fetchGames).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('if games are already loaded just return', async () => {
    areGamesLoaded.mockReturnValue(true);

    await store.dispatch(actions.onHomePageEnter());
  
    expect(fetchGames).toBeCalledTimes(0);
    expect(store.getActions()).toEqual([]);
  });
});

describe("#fetchGamesAndRuns", () => {
  const gameId = "game-1";
  it('should create expected actions when games and runs fetch succeed', async () => {
    fetchByUrl.mockResolvedValue("runs");
    fetchGames.mockResolvedValue("games");
    
    areGamesLoaded.mockReturnValue(false);
    getRunsUrl.mockReturnValue("url");
    areRunsLoadedByGameId.mockReturnValue(false);

    const expectedActions = [
      { type: types.FETCH_GAMES_REQUEST },
      { type: types.FETCH_GAMES_SUCCESS, games: "games" },
      { type: types.FETCH_RUNS_REQUEST },
      { type: types.FETCH_RUNS_SUCCESS, runs: "runs", id: gameId }
    ];
  
    await store.dispatch(actions.fetchGamesAndRuns(gameId));

    expect(fetchGames).toBeCalledTimes(1);
    expect(fetchGames).toHaveBeenCalledWith();
    expect(fetchByUrl).toBeCalledTimes(1);
    expect(fetchByUrl).toHaveBeenCalledWith("url");

    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create expected actions when games fetch fails', async () => {    
    fetchByUrl.mockResolvedValue("runs");
    fetchGames.mockRejectedValue("error-message");
    
    areGamesLoaded.mockReturnValue(false);
    getRunsUrl.mockReturnValue("url");
    areRunsLoadedByGameId.mockReturnValue(false);

    const expectedActions = [
      { type: types.FETCH_GAMES_REQUEST },
      { type: types.FETCH_GAMES_ERROR, error: "error-message" },
      { type: types.FETCH_RUNS_REQUEST },
      { type: types.FETCH_RUNS_SUCCESS, runs: "runs", id: gameId }
    ];
  
    await store.dispatch(actions.fetchGamesAndRuns(gameId));
  
    expect(fetchGames).toBeCalledTimes(1);
    expect(fetchGames).toHaveBeenCalledWith();
    expect(fetchByUrl).toBeCalledTimes(1);
    expect(fetchByUrl).toHaveBeenCalledWith("url");

    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create expected actions when runs fetch fails', async () => {    
    fetchGames.mockResolvedValue("games");
    fetchByUrl.mockRejectedValue("error-message");
    
    areGamesLoaded.mockReturnValue(false);
    getRunsUrl.mockReturnValue("url");
    areRunsLoadedByGameId.mockReturnValue(false);

    const expectedActions = [
      { type: types.FETCH_GAMES_REQUEST },
      { type: types.FETCH_GAMES_SUCCESS, games: "games" },
      { type: types.FETCH_RUNS_REQUEST },
      { type: types.FETCH_RUNS_ERROR, error: "error-message" }
    ];
  
    await store.dispatch(actions.fetchGamesAndRuns(gameId));
  
    expect(fetchGames).toBeCalledTimes(1);
    expect(fetchGames).toHaveBeenCalledWith();
    expect(fetchByUrl).toBeCalledTimes(1);
    expect(fetchByUrl).toHaveBeenCalledWith("url");

    expect(store.getActions()).toEqual(expectedActions);
  });
  it('if games are already loaded just fetch runs', async () => {
    areGamesLoaded.mockReturnValue(true);
    getRunsUrl.mockReturnValue("url");
    areRunsLoadedByGameId.mockReturnValue(false);

    const expectedActions = [
      { type: types.FETCH_RUNS_REQUEST },
      { type: types.FETCH_RUNS_ERROR, error: "error-message" }
    ];

    await store.dispatch(actions.fetchGamesAndRuns(gameId));
    
    expect(fetchGames).toBeCalledTimes(0);
    expect(fetchByUrl).toBeCalledTimes(1);
    expect(fetchByUrl).toHaveBeenCalledWith("url");

    expect(store.getActions()).toEqual(expectedActions);
  });
  it('if runs and games are already loaded just return', async () => {
    areGamesLoaded.mockReturnValue(true);
    areRunsLoadedByGameId.mockReturnValue(true);
    getRunsUrl.mockReturnValue("url");

    const expectedActions = [];

    await store.dispatch(actions.fetchGamesAndRuns(gameId));
    
    expect(fetchGames).toBeCalledTimes(0);
    expect(fetchByUrl).toBeCalledTimes(0);
    
    expect(store.getActions()).toEqual(expectedActions);
  });
});