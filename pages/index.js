import React from "react";
import { connect } from 'react-redux'
import { onHomePageEnter } from "../store/actions";
import { getGames, isFetchingGames } from "../store/reducers";
import GamesList from "../components/GamesList";

const Home = props => <GamesList {...props} />;

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