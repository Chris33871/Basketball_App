import React, { useEffect, useState } from "react";
import "./GamesList.css";

import { API, Auth, graphqlOperation } from "aws-amplify";
import { listGamesTables } from "../graphql/queries";
import { updateGamesTable } from "../graphql/mutations";

import { Alert } from "@aws-amplify/ui-react";

function GamesList(userData) {
  const [games, setGames] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentDate = new Date();

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

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const gamesData = await API.graphql(
        graphqlOperation(listGamesTables, { limit: 15 })
      );
      const games = gamesData.data.listGamesTables.items.map((game) => ({
        ...game,
        // ensure the GamePlayers array is not null or undefined
        GamePlayers: game.GamePlayers ? game.GamePlayers : [],
      }));
      //console.log("games", games);
      setGames(games);
    } catch (error) {
      console.error("Error retrieving games:", error);
    }
  };

  const handleJoinGame = async (gameId) => {
    // ensuring user is authenticated before he can join a game
    if (!isAuthenticated) {
      console.warn("User is not authenticated");
      alert("Please sign in to join a game.");
      return;
    }

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const gameToUpdate = games.find((game) => game.id === gameId);
      console.log("gameToUpdate", gameToUpdate);
      console.log("currentDate", currentDate);
      if (gameToUpdate) {
        // filter out empty strings from the existing GamePlayers array
        const existingPlayers = gameToUpdate.GamePlayers.filter(Boolean);
        console.log("existingPlayers", existingPlayers);

        // check if the current user is already in the GamePlayers array
        if (existingPlayers.includes(currentUser.attributes.email)) {
          console.warn("User already joined game:", gameId);
          setShowFailAlert(true);
          setTimeout(() => {
            setShowFailAlert(false);
          }, 2000);
          return;
        }
        //Check if the game has already passed
        const toUpdateGameDate = new Date(gameToUpdate.GameDate);
        if (toUpdateGameDate < currentDate) {
          console.warn("Game has already passed:", gameId);
          setShowFailAlert(true);
          setTimeout(() => {
            setShowFailAlert(false);
          }, 2000);
          return;
        }

        const updatedPlayers = [
          ...existingPlayers,
          currentUser.attributes.email,
        ];
        console.log("updatedPlayers", updatedPlayers);
        await API.graphql(
          graphqlOperation(updateGamesTable, {
            input: {
              id: gameId,
              GamePlayers: updatedPlayers,
            },
          })
        );
        // Refresh the games list after successful update
        fetchGames();
        console.log("Successfully joined game:", gameId);
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  const getPlayerCount = (players) => {
    return players.length || 0;
  };

  const userEmailAddress = userData.userData.userData.Email;

  return (
    <div>
      {showSuccessAlert ? (
        <Alert
          variation="success"
          isDismissible={true}
          hasIcon={true}
          heading="Joining Game"
        >
          Successfully joined game!
        </Alert>
      ) : null}
      {showFailAlert ? (
        <Alert
          variation="warning"
          isDismissible={true}
          hasIcon={true}
          heading="Joining Game"
        >
          Failed to join game!
        </Alert>
      ) : null}
      <ul className="games--list">
        {games
          .sort((a, b) => new Date(b.GameDate) - new Date(a.GameDate))
          .map((game) => {
            const gameDate = new Date(game.GameDate);
            const options = { month: "short", day: "numeric" };
            //const options = { year: "numeric", month: "short", day: "numeric" };
            const gameDateFormatted = gameDate.toLocaleDateString(
              undefined,
              options
            );
            const gameHasPassed = gameDate < currentDate;
            const gameClass = gameHasPassed
              ? "game--item--passed"
              : "game--item";
            const joinGameBtn = gameHasPassed
              ? "join-game--button--passed"
              : "join-game--button";
            return (
              <li key={game.id} className={gameClass}>
                <div className="game--date-time">
                  <div className="game--date">{gameDateFormatted}</div>
                  <div className="game--time">{game.GameTime}</div>
                </div>
                <div className="game--info">
                  <div className="game--generalLocation">{game.Location}</div>
                  <div className="game--host">
                    {game.GameCompLvl} Game by {game.GameOwner}
                  </div>
                </div>
                <div className="game--players">
                  Player count: {getPlayerCount(game.GamePlayers)}
                </div>
                {game.GamePlayers.includes(userEmailAddress) ? (
                  <button className="joined-button">Joined!</button>
                ) : (
                  <button
                    className={joinGameBtn}
                    onClick={() => handleJoinGame(game.id)}
                  >
                    Join
                  </button>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default GamesList;
