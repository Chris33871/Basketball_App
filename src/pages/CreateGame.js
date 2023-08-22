import React, { useState, useEffect } from "react";
import "./CreateGame.css";
import { useNavigate } from "react-router-dom";

import { API, Auth, graphqlOperation } from "aws-amplify";
import { createGamesTable } from "../graphql/mutations";

function CreateGame() {
  const [location, setLocation] = useState("");
  const [gameCourt, setGameCourt] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [gameTime, setGameTime] = useState("");
  const [gameCompLvl, setGameCompLvl] = useState("");
  const [playersSex, setPlayersSex] = useState("");
  const [gamePrice, setGamePrice] = useState(0);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    async function checkAuthentication() {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    checkAuthentication();
  }, []);

  const navigate = useNavigate();
  if (!isAuthenticated) {
    return (
      <div className="unauthenticated--div">
        <p>Please sign in to create a game.</p>
        <button onClick={() => navigate("/login")}>Sign in</button>
      </div>
    );
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await Auth.currentAuthenticatedUser();
      const userEmail = user.attributes.email;
      console.log("userEmail", userEmail);
      const newGame = await API.graphql(
        graphqlOperation(createGamesTable, {
          input: {
            Location: location,
            GameDate: gameDate,
            GameTime: gameTime,
            GameCompLvl: gameCompLvl,
            GamePlayers: [userEmail],
            GamePrice: gamePrice,
            GameOwner: userEmail,
            GameCourt: gameCourt,
            PlayersSex: playersSex,
          },
        })
      );
      console.log("Created game:", newGame.data);

      // Reset the form fields
      setLocation("");
      setGameCourt("");
      setGameDate("");
      setGameTime("");
      setGameCompLvl("");
      setPlayersSex("");
      setGamePrice(0);

      alert("Game created successfully!");
      navigate("/");

      // Handle the response or navigate to a different page
    } catch (error) {
      console.error("Error creating game:", error);
      // Handle the error
    }
  };

  return (
    <div className="create-game" style={{}}>
      {/* <button className="button--back" onClick={() => window.history.back()}>
        Back
      </button> */}
      <form onSubmit={handleFormSubmit} className="form--create-game">
        <div className="form--create-game--column">
          <label className="label--create-game--location">
            Location
            <br />
            <input
              className="input--create-game"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label className="label--create-game--date">
            Date
            <br />
            <input
              className="input--create-game"
              type="date"
              name="gameDate"
              value={gameDate}
              onChange={(e) => setGameDate(e.target.value)}
            />
          </label>
          <label className="label--create-game--time">
            Start Time
            <br />
            <input
              className="input--create-game"
              type="time"
              step="900"
              name="gameTime"
              value={gameTime}
              onChange={(e) => setGameTime(e.target.value)}
            />
          </label>
        </div>

        <div className="form--create-game--column">
          <label className="label--create-game--sex">
            Game Competition Level
            <br />
            <select
              className="input--create-game"
              name="gameCompLvl"
              value={gameCompLvl}
              onChange={(e) => setGameCompLvl(e.target.value)}
            >
              <option disabled={true} value="">
                -- Select a competition level --
              </option>
              <option value="Leisure">Leisure</option>
              <option value="Competitive">Competitive</option>
              <option value="Pro Run">Pro Run</option>
            </select>
          </label>
          <label className="label--create-game--sex">
            Players Sex
            <br />
            <select
              className="input--create-game"
              name="playersSex"
              value={playersSex}
              onChange={(e) => setPlayersSex(e.target.value)}
            >
              <option disabled={true} value="">
                -- Select Player Sex --
              </option>
              <option value="Mix">Mix </option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </label>
          <label className="label--create-game--sex">
            Court
            <br />
            <select
              className="input--create-game"
              name="gameCourt"
              value={gameCourt}
              onChange={(e) => setGameCourt(e.target.value)}
            >
              <option disabled={true} value="">
                -- Select Location --
              </option>
              <option value="Outdoors">Outdoors</option>
              <option value="Indoors">Indoors</option>
            </select>
          </label>
        </div>
      </form>
      <button
        type="submit"
        className="button--create-game"
        onClick={handleFormSubmit}
      >
        Create Game
      </button>
    </div>
  );
}

export default CreateGame;
