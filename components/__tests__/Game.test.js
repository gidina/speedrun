import React from 'react';
import renderer from 'react-test-renderer';
import Game from '../Game';

describe("Game component", () => {
    it('Renders correctly', () => {
        const game = {
            id: "game-1", 
            name: "international-name",
            logoUrl: "cover-small-uri"
        };
        const tree = renderer
            .create(<Game game={game} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});