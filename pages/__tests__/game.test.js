import React from "react";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Game from "../game";
import { getSelectedGame } from "../../store/reducers";
import { onGameDetailPageEnter } from "../../store/actions";

jest.mock("../../components/GameDetail", () => "GameDetail-mock");
jest.mock("../../store/reducers/index");
jest.mock("../../store/actions");

const selectedGameMock = {
    id: "game-1", 
    name: "international-name",
    logoUrl: "cover-small-uri", 
    firstRun: {
        firstPlayerName: "player-name",
        timePlayed: 23,
        videoUrl: "link-uri"
    }
};

getSelectedGame.mockReturnValue(selectedGameMock);
onGameDetailPageEnter.mockReturnValue({ type: "DUMMY_FETCH_GAMES" });

const initialState = {};

const mockStore = configureStore();
const store = mockStore(initialState);

beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
});

it('Renders correctly', () => {
    const wrapper = <Provider store={store}><Game /></Provider>;
    const tree = renderer
        .create(wrapper)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('#getInitialProps', async () => {
    const gameId = "game-1";
    const context = {
        reduxStore: store,
        query: {
            id: gameId
        } 
    };
    await Game.getInitialProps(context);
    expect(onGameDetailPageEnter).toHaveBeenCalledTimes(1);
    expect(onGameDetailPageEnter).toHaveBeenCalledWith(gameId); 
    expect(store.getActions()).toContainEqual({ type: "DUMMY_FETCH_GAMES" });
});
