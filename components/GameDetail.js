import React from "react";
import PropTypes from 'prop-types';

import "./game.css";

const GameDetail = props => {
    const { isLoadingRuns, selectedGame } = props;
    
    if (isLoadingRuns) {
        return <div>Loading...</div>;
    }

    if (!selectedGame) {
        return <div>Ooops, this game does not exist</div>;
    }

    const { name, logoUrl, firstRun } = selectedGame;
    const { firstPlayerName, timePlayed, videoUrl } = firstRun;

    return <div className="game-detail">
        <img className="game-detail-img" alt="" src={logoUrl} />
        <span className="game-detail-name">{name}</span>
        <div className="game-detail-player">{firstPlayerName}</div>
        <span className="game-detail-runs">{timePlayed}</span>
        <button className="game-detail-video"><a href={videoUrl}>Video</a></button>
    </div>
};

export default GameDetail;

GameDetail.propTypes = {
    selectedGame: PropTypes.shape({
        name: PropTypes.string,
        logoUrl: PropTypes.string,
        firstRun: PropTypes.shape({
            firstPlayerName: PropTypes.string,
            timePlayed: PropTypes.integer,
            videoUrl: PropTypes.string
        })
    })
};