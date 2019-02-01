import React from "react";

import "./index.css";

const GamesList = props => {
    return (
        <div>
            <h1 className="games-title">Games</h1>
            <ul className="games-list">
                {props.children}
            </ul>
        </div>
    );
};

export default GamesList;