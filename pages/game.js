import React from "react";
import { connect } from 'react-redux';
import { onGameDetailPageEnter } from "../store/actions";
import { getSelectedGame, isFetchingRuns } from "../store/reducers";
import GameDetail from "../components/GameDetail";

const Game = props => <GameDetail {...props} />;

Game.getInitialProps = async ({ req, query, reduxStore }) => {
    const { id } = query;

    if (req) {
        await reduxStore.dispatch(onGameDetailPageEnter(id));
    } else {
        reduxStore.dispatch(onGameDetailPageEnter(id));
    }
    
    return { id };    
};

const mapStateToProps = (state, props) => {
    return {
        selectedGame: getSelectedGame(state, props.id),
        isLoadingRuns: isFetchingRuns(state)
    }
};

export default connect(mapStateToProps, null)(Game);