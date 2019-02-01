import React from 'react';
import renderer from 'react-test-renderer';
import GamesList from '../GamesList';

describe("GamesList component", () => {
    it('Renders correctly', () => {
        const tree = renderer
            .create(
                <GamesList>
                    <div>Children 1</div>
                    <div>Children 2</div>
                </GamesList>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});