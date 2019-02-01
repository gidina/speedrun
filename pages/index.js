import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { onHomePageEnter } from "../store/actions";
import { getGames, isFetchingGames } from "../store/reducers";
import GamesList from "../components/GamesList";
import Game from "../components/Game";

const Home = props => {
    const { isFetchingGames, games } = props;

    if (isFetchingGames) {
        return <div>Loading...</div>;
    }

    if (!games) {
        return <div>There are no games</div>;
    }

    return (
        <GamesList>
            {games.map(game => <Game key={game.id} game={game}/>)}
        </GamesList>
    );
};

Home.getInitialProps = async ({ reduxStore, req }) => {
    if (req) {
        await reduxStore.dispatch(onHomePageEnter());
    } else {
        reduxStore.dispatch(onHomePageEnter());
    }
    return {};
};

const mapStateToProps = (state) => {
    return {
        games: getGames(state),
        isFetchingGames: isFetchingGames(state)
    }
};

export default connect(mapStateToProps, null)(Home);

Home.propTypes = {
    isFetchingGames: PropTypes.bool,
    games: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.integer,
        logoUrl: PropTypes.string,
        name: PropTypes.string
    })),
}