import { connect } from 'react-redux';
import { fetchGamesAndRuns } from "../store/actions";
import { getSelectedGame } from "../store/reducers";

const Game = (props) => {
    const { selectedGame } = props;
    const { name, logoUrl, firstRun } = selectedGame;
    const firstPlayer = firstRun.players[0];

    if (!firstPlayer || !firstRun) return null;

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

    await context.reduxStore.dispatch(fetchGamesAndRuns(id));
    return { id };
};

const mapStateToProps = (state, props) => {
    return {
        selectedGame: getSelectedGame(state, props.id)
    }
};

export default connect(mapStateToProps, null)(Game);