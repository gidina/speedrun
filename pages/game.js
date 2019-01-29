import { connect } from 'react-redux';
import { fetchGamesAndRuns } from "../store/actions";
import { getSelectedGame } from "../store/reducers";

import "./game.css";

const Game = (props) => {
    const { selectedGame } = props;
    const { name, logoUrl, firstRun } = selectedGame;
    const firstPlayer = firstRun.players[0];

    if (!firstPlayer || !firstRun) return null;

    return <div className="game-detail">
        <img className="game-detail-img" alt="" src={logoUrl} />
        <span className="game-detail-name">{name}</span>
        <div className="game-detail-player">{firstPlayer.id}</div>
        <span className="game-detail-runs">{firstRun.times.primary_t}</span>
        <button className="game-detail-video"><a href={firstRun.videos.links[0].uri}>Video</a></button>
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