import { connect } from 'react-redux';
import { fetchGames, fetchRuns } from "../store/actions";
import { getGames, getRuns, getSelectedGame } from "../store/reducers";

const Game = (props) => {
    const { selectedGame } = props;
    const { name, logoUrl, firstRun } = selectedGame;
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
    const games = getGames(context.reduxStore.getState());

    if (games.length !== 0) {
        const filterByID = (obj) => obj.id === id;
        const selectedGame = games.filter(filterByID)[0];

        const filterByRel = (obj) => obj.rel === 'runs';
        const linkToRuns = selectedGame.links.filter(filterByRel)[0].uri;

        await context.reduxStore.dispatch(fetchRuns(linkToRuns));
        return { id };
    }

    await context.reduxStore.dispatch(fetchGames());

    const games2 = getGames(context.reduxStore.getState());

    const filterByID2 = (obj) => obj.id === id;
    const selectedGame2 = games2.filter(filterByID2)[0];

    const filterByRel2 = (obj) => obj.rel === 'runs';
    const linkToRuns2 = selectedGame2.links.filter(filterByRel2)[0].uri;

    await context.reduxStore.dispatch(fetchRuns(linkToRuns2));
    return { id };
};

const mapStateToProps = (state, props) => {
    return {
        selectedGame: getSelectedGame(state, props.id)
    }
};

export default connect(mapStateToProps, null)(Game);