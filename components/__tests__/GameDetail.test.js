import React from 'react';
import renderer from 'react-test-renderer';
import GameDetail from '../GameDetail';

it('Renders correctly', () => {
    const selectedGame = {
        name: "selected-game-name",
        logoUrl: "selected-game-logo-url",
        firstRun: {
            players: [
                {
                    id: "first-player-id"
                }
            ],
            videos: {
                links: [
                    {
                        uri: "selected-game-video-url"
                    }
                ]
            },
            times: {
                primary_t: 493
            }
        }
    };
    const tree = renderer
        .create(<GameDetail selectedGame={selectedGame} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("If firstRun doesn't exist on selectedGame prop it renders null", () => {
    const selectedGame = {
        name: "selected-game-name",
        logoUrl: "selected-game-logo-url"
    };
    const tree = renderer
        .create(<GameDetail selectedGame={selectedGame} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("If first player doesn't exist on selectedGame.firstRun prop it renders null", () => {
    const selectedGame = {
        name: "selected-game-name",
        logoUrl: "selected-game-logo-url",
        firstRun: {
            videos: {
                links: [
                    {
                        uri: "selected-game-video-url"
                    }
                ]
            },
            times: {
                primary_t: 493
            }
        }
    };
    const tree = renderer
        .create(<GameDetail selectedGame={selectedGame} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});