import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../index';
import * as types from '../actionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe.skip('async actions', () => {
    afterEach(() => {
      fetchMock.restore();
    });
  
    it('creates FETCH_GAMES_SUCCESS when fetching games has been done', () => {
      fetchMock.getOnce('https://www.speedrun.com/api/v1/games', {
        body: { data: ['do something'] },
        headers: { 'content-type': 'application/json' }
      });
  
      const expectedActions = [
        { type: types.FETCH_GAMES_SUCCESS, games: ['do something'] }
      ];
      const store = mockStore({ games: [] });
  
      return store.dispatch(actions.onHomePageEnter()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});