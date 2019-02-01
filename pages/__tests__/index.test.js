import React from "react";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Home from "../index";
import { getGames, isFetchingGames } from "../../store/reducers";
import { onHomePageEnter } from "../../store/actions";

jest.mock("../../components/GamesList", () => "GamesList-mock");
jest.mock("../../components/Game", () => "Game-mock");
jest.mock("../../store/reducers/index");
jest.mock("../../store/actions");

const gamesMock = [
    {
        id: "game-1", 
        name: "international-name",
        logoUrl: "cover-small-uri"
    },
    {
        id: "game-2", 
        name: "international-name-2",
        logoUrl: "cover-small-uri-2"
    }
];

const initialState = {};

const mockStore = configureStore();
const store = mockStore(initialState);

describe("index page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions();
        getGames.mockReturnValue(gamesMock);
        isFetchingGames.mockReturnValue(false);
        onHomePageEnter.mockReturnValue({ type: "DUMMY_FETCH_GAMES" });
    });
    
    
    it('Renders correctly', () => {
        const wrapper = <Provider store={store}><Home /></Provider>;
        const tree = renderer
            .create(wrapper)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it('#getInitialProps', async () => {
        const context = {
            reduxStore: store
        };
        await Home.getInitialProps(context);
        expect(onHomePageEnter).toHaveBeenCalledTimes(1);
        expect(onHomePageEnter).toHaveBeenCalledWith(); 
        expect(store.getActions()).toContainEqual({ type: "DUMMY_FETCH_GAMES" });
    });

    it("If games prop doesn't exist it renders a message explaining that there are no games", () => {
        getGames.mockReturnValue(null);
        const wrapper = <Provider store={store}><Home /></Provider>;
        const tree = renderer
            .create(wrapper)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it("If is fetching games, shows a Loading", () => {
        isFetchingGames.mockReturnValue(true);
        const wrapper = <Provider store={store}><Home /></Provider>;
        const tree = renderer
            .create(wrapper)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});