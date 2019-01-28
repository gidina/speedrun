import fetch from 'isomorphic-unfetch';

const Game = (props) => {
    const { name, logoUrl, firstRun } = props;
    const firstPlayer = firstRun.players[0];
    return <div>
        <h1>Game name: {name}</h1>
        <div>Game logo: <img alt="" src={logoUrl} /></div>
        <button>Game video url: {firstRun.videos.links[0].uri} Video</button>
        <div>Player id: {firstPlayer.id}</div>
        <h5>{firstRun.times.primary_t}</h5>
    </div>
};

Game.getInitialProps = async (context) => {

    const { id } = context.query;
    const games = context.reduxStore.getState().games;

    if (games.length !== 0) {
        const filterByID = (obj) => obj.id === id;
        const selectedGame = games.filter(filterByID)[0];

        const filterByRel = (obj) => obj.rel === 'runs';
        const linkToRuns = selectedGame.links.filter(filterByRel)[0];
        
        const res = await fetch(linkToRuns);
        const result = await res.json();

        const gameRuns = result.data;
        const firstRun = gameRuns[0];

        return {
            id, 
            name: selectedGame.names.international, 
            logoUrl: selectedGame.assets['cover-small'].uri,
            firstRun
        };
    }
    
    const resultFake = {
        data: [
            {
                id: "7z0nvdem",
                game: "k6qqkx6g",
                videos: {
                    links: [
                        {
                            uri: "https://youtu.be/-Vesbd8uJzE"
                        }
                    ]
                },
                players: [
                    {
                        rel: "user",
                        id: "mkj9nw84",
                        uri: "https://www.speedrun.com/api/v1/users/mkj9nw84"
                    }
                ],
                times: {
                    primary_t: 435,
                }
            }
        ]
    };
    const gameRuns = resultFake.data;
    const firstRun = gameRuns[0];

    return { id, name: 'test-name', logoUrl: 'test logo url', firstRun };
};

export default Game