import React from 'react';
import renderer from 'react-test-renderer';
import GamesList from '../GamesList';

jest.mock('next/link', () => "Link-mock");

it('Renders correctly', () => {
    const games = [
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
    const tree = renderer
        .create(<GamesList games={games} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});