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