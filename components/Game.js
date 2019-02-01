import React from "react";
import PropTypes from 'prop-types';
import Link from 'next/link';

import "./Game.css";

const Game = props => {
    const { game } = props;
    return (
        <Link as={`/game/${game.id}`} href={`/game?id=${game.id}`}>
            <li className="game">
                <img alt="" className="game-img" src={game.logoUrl} />
                <h3 className="game-title">{game.name}</h3>
            </li>
        </Link>
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