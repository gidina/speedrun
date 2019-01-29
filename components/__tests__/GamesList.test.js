import React from 'react';
import GamesList from '../GamesList';
import renderer from 'react-test-renderer';

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