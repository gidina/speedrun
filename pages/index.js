import { connect } from 'react-redux'
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { fetchGamesSuccess } from "../store/actions";

import "../styles.css";

const Home = (props) => (
    <div>
        <h1 className="test-css">Games</h1>
        <ul>
            {props.games.map((game) => (
                <li key={game.id}>
                    <img alt="" src={game.assets['cover-small'].uri} />
                    <Link as={`/game/${game.id}`} href={`/game?id=${game.id}`}>
                        <a>{game.names.international}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

Home.getInitialProps = async ({ reduxStore }) => {
    const res = await fetch('https://www.speedrun.com/api/v1/games');
    const result = await res.json();
    const games = result.data;

    reduxStore.dispatch(fetchGamesSuccess(games));

    return {};
};

const mapStateToProps = (state) => {
    return {
        games: state.games
    }
};

export default connect(mapStateToProps, null)(Home);