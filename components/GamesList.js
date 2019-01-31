import React from "react";
import Link from 'next/link';
import PropTypes from 'prop-types';

import "./index.css";

const GamesList = props => {
    const { isFetchingGames, games } = props;

    if (isFetchingGames) {
        return <div>Loading...</div>;
    }

    if (!games) {
        return <div>There are no games</div>;
    }

    return (
        <div>
            <h1 className="games-title">Games</h1>
            <ul className="games-list">
                {games.map((game) => (
                    <li key={game.id} className="game">
                        <img alt="" className="game-img" src={game.logoUrl} />
                        <Link as={`/game/${game.id}`} href={`/game?id=${game.id}`}>
                            <a className="game-title">{game.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GamesList;

GamesList.propTypes = {
    isFetchingGames: PropTypes.bool,
    games: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.integer,
        logoUrl: PropTypes.string,
        name: PropTypes.string
    })),
}