import React from "react";
import { connect } from 'react-redux'
import { fetchGames } from "../store/actions";
import { getGames } from "../store/reducers";
import GamesList from "../components/GamesList";

const Home = props => <GamesList {...props} />;

Home.getInitialProps = async ({ reduxStore }) => {
    await reduxStore.dispatch(fetchGames());
    return {};
};

const mapStateToProps = (state) => {
    return {
        games: getGames(state)
    }
};

export default connect(mapStateToProps, null)(Home);