import React from 'react';
import renderer from 'react-test-renderer';
import GamesList from '../GamesList';

jest.mock('next/link', () => "Link-mock");

it('Renders correctly', () => {
    const games = [
        {
            id: 1,
            assets: {
                'cover-small': {
                    uri: "cover-small-uri"
                }
            },
            names: {
                international: "name-international"
            }
        }
    ];
    const tree = renderer
        .create(<GamesList games={games} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});