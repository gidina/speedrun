import React from "react";
import PropTypes from 'prop-types';

import "./game.css";

const GameDetail = props => {
    const { selectedGame, isLoadingRuns } = props;
    
    if (isLoadingRuns) {
        return <div>Loading...</div>;
    }

    if (!selectedGame) {
        return <div>Ooops, this game does not exist</div>;
    }

    const { name, logoUrl, firstRun } = selectedGame;

    if (!firstRun || !firstRun.players) {
        return null;
    }

    const firstPlayer = firstRun.players[0];

    return <div className="game-detail">
        <img className="game-detail-img" alt="" src={logoUrl} />
        <span className="game-detail-name">{name}</span>
        <div className="game-detail-player">{firstPlayer.id}</div>
        <span className="game-detail-runs">{firstRun.times.primary_t}</span>
        <button className="game-detail-video"><a href={firstRun.videos.links[0].uri}>Video</a></button>
    </div>
};

export default GameDetail;

GameDetail.propTypes = {
    selectedGame: PropTypes.shape({
        name: PropTypes.string,
        logoUrl: PropTypes.string,
        firstRun: PropTypes.shape({
            players: PropTypes.array,
            videos: PropTypes.shape({
                links: PropTypes.arrayOf(PropTypes.shape({
                    uri: PropTypes.string
                }))
            })
        })
    })
};