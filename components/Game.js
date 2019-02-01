import React from "react";
import PropTypes from 'prop-types';
import Link from 'next/link';

import "./index.css";

const Game = props => {
    const { game } = props;
    return (
        <li className="game">
            <img alt="" className="game-img" src={game.logoUrl} />
            <Link as={`/game/${game.id}`} href={`/game?id=${game.id}`}>
                <a className="game-title">{game.name}</a>
            </Link>
        </li>
    );
};

export default Game;

Game.propTypes = {
    game: PropTypes.shape({
        id: PropTypes.integer,
        logoUrl: PropTypes.string,
        name: PropTypes.string
    }).isRequired
};