import React from "react";
import Link from 'next/link';
import PropTypes from 'prop-types';

import "./index.css";

const GamesList = props => (
    <div>
        <h1 className="games-title">Games</h1>
        <ul className="games-list">
            {props.games.map((game) => (
                <li key={game.id} className="game">
                    <img alt="" className="game-img" src={game.assets['cover-small'].uri} />
                    <Link as={`/game/${game.id}`} href={`/game?id=${game.id}`}>
                        <a className="game-title">{game.names.international}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default GamesList;

GamesList.propTypes = {
    games: PropTypes.array.isRequired
};