import { connect } from 'react-redux'
import fetch from 'isomorphic-unfetch';

import "../styles.css";

const Home = (props) => (
    <div>
        <h1 className="example">Games</h1>
        <ul>
            {props.games.map((game) => (
                <li key={game.id}>
                    <img alt="" src={game.assets['cover-small'].uri} />
                    {game.names.international}
                </li>
            ))}
        </ul>
    </div>
);

Home.getInitialProps = async ({ reduxStore }) => {
    const res = await fetch('https://www.speedrun.com/api/v1/games');
    const result = await res.json();

    reduxStore.dispatch({ type: 'FETCH_GAMES_SUCCESS', games: result.data });

    return {};
};

const mapStateToProps = (state) => {
    return {
        games: state.games
    }
};

export default connect(mapStateToProps, null)(Home);