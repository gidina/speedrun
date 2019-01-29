import { connect } from 'react-redux'
import Link from 'next/link';
import { fetchGames } from "../store/actions";
import { getGames } from "../store/reducers";

import "./index.css";

const Home = (props) => (
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