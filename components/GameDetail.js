import React from "react";
import "./game.css";

const GameDetail = props => {
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

export default GameDetail;