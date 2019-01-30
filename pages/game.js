import React from "react";
import { connect } from 'react-redux';
import { fetchGamesAndRuns } from "../store/actions";
import { getSelectedGame } from "../store/reducers";
import GameDetail from "../components/GameDetail";

const Game = props => <GameDetail {...props} />;

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