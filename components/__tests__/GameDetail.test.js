import React from 'react';
import renderer from 'react-test-renderer';
import GameDetail from '../GameDetail';

describe.only("GameDetail component", () => {
    it('Renders correctly', () => {
        const selectedGame = {
            id: "game-1", 
            name: "international-name",
            logoUrl: "cover-small-uri", 
            firstRun: {
                firstPlayerName: "player-name",
                timePlayed: 23,
                videoUrl: "link-uri",

            }
        };
        const tree = renderer
            .create(<GameDetail selectedGame={selectedGame} isLoadingRuns={false} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    it("If selectedGame prop doesn't exist it renders a message explaining that game doesn't exist", () => {
        const tree = renderer
            .create(<GameDetail isLoadingRuns={false}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("If is fetching games or runs, shows a Loading", () => {
        const tree = renderer
            .create(<GameDetail isLoadingRuns={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});