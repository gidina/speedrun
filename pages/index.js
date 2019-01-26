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

Home.getInitialProps = async () => {
    const res = await fetch('https://www.speedrun.com/api/v1/games');
    const result = await res.json();

    return {
        games: result.data
    };
};

export default Home;