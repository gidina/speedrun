import React from "react";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Home from "../index";
import { getGames } from "../../store/reducers";
import { onHomePageEnter } from "../../store/actions";

jest.mock("../../components/GamesList", () => "GamesList-mock");
jest.mock("../../store/reducers/index");
jest.mock("../../store/actions");

const gamesMock = [
    {
        id: "game-1", 
        names: { 
            international: "international-name"
        }, 
        assets: { 
            "cover-small" : { 
                uri: "cover-small-uri"
            }
        },
        links: [
            { 
                rel: "self", 
                uri: "lin-uri-self" 
            },
            { 
                rel: "runs", 
                uri: "link-uri-runs" }
        ]
    }
];

getGames.mockReturnValue(gamesMock);
onHomePageEnter.mockReturnValue({ type: "DUMMY_FETCH_GAMES" });

const initialState = {};

const mockStore = configureStore();
const store = mockStore(initialState);

beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
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
