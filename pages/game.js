import fetch from 'isomorphic-unfetch';

const Game = (props) => {
    const firstRun = props.firstRun;
    const firstPlayer = firstRun.players[0];
    return <div>
        <h1>{firstPlayer.id} Name</h1>
        <button>{firstRun.videos.links[0].uri} Video</button>
        <h5>{firstRun.times.primary_t}</h5>
        <div>game logo</div>
        <div>game name {props.id}</div>
    </div>
};

Game.getInitialProps = async (context) => {
    const { id } = context.query;
    // const res = await fetch(`https://www.speedrun.com/api/v1/runs?game=${id}`);
    // const result = await res.json();
    const result = {
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
    const gameRuns = result.data;
    const firstRun = gameRuns[0];

    return { firstRun, id };
};

export default Game