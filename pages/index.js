import React from "react";
import { connect } from 'react-redux'
import { onHomePageEnter } from "../store/actions";
import { getGames } from "../store/reducers";
import GamesList from "../components/GamesList";

const Home = props => <GamesList {...props} />;

Home.getInitialProps = async ({ reduxStore }) => {
    await reduxStore.dispatch(onHomePageEnter());
    return {};
};

const mapStateToProps = (state) => {
    return {
        games: getGames(state)
    }
};

export default connect(mapStateToProps, null)(Home);