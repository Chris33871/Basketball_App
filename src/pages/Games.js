import React from "react";
// import Filters from "../components/Filters";
import "./Games.css";
import GamesList from "../components/GamesList";
import CreateGameBtn from "../components/CreateGameBtn";

function Games(userData) {
  return (
    <div className="game--page">
      <div className="game--content">
        {/* <div className="game--filters">
          <div className="game--filters--header">
            <h1>Filters</h1>
          </div>
          <Filters />
        </div> */}

        <div className="game--list">
          <div className="game--list--header">
            <h1>Games</h1>
            <CreateGameBtn className="create-game--btn" />
          </div>
          <GamesList userData={userData} />
        </div>
      </div>
    </div>
  );
}

export default Games;
