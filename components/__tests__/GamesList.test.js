import React from 'react';
import renderer from 'react-test-renderer';
import GamesList from '../GamesList';

jest.mock('next/link', () => "Link-mock");

describe("GamesList component", () => {
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
    
    it("If games prop doesn't exist it renders a message explaining that there are no games", () => {
        const tree = renderer
            .create(<GamesList isFetchingGames={false}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it("If is fetching games, shows a Loading", () => {
        const tree = renderer
            .create(<GamesList isFetchingGames={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});