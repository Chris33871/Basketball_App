import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listTeamsTables, getUsersTable } from "../graphql/queries";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { updateTeamsTable, updateUsersTable } from "../graphql/mutations";
import "./TeamsList.css";
import { FaSearch } from "react-icons/fa";
import { Alert } from "@aws-amplify/ui-react";

const getTeamNames = (query, teamNames) => {
  if (!query) {
    return teamNames;
  }
  const lowerCaseQuery = query.toLowerCase();
  return teamNames.filter((teamName) =>
    teamName.toLowerCase().includes(lowerCaseQuery)
  );
};

function TeamsPublic(props) {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const [userTeam, setUserTeam] = useState([]);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  console.log(props);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    fetchUserTeam();
  }, []);

  // Getting all teams
  const fetchTeams = async () => {
    console.log("TeamsList.js fetchTeams function called");
    try {
      const teamsData = await API.graphql(
        graphqlOperation(listTeamsTables, { limit: 50 })
      );
      const teams = teamsData.data.listTeamsTables.items.map((team) => ({
        ...team,
        // ensure the GamePlayers array is not null or undefined
        TeamPlayers: team.TeamPlayers ? team.TeamPlayers : [],
      }));
      console.log("teams", teams);
      setTeams(teams);
    } catch (error) {
      console.error("Error retrieving teams:", error);
    }
  };

  // Getting the user's team
  const fetchUserTeam = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setCurrentUserName(currentUser.username);
      const userData = await API.graphql(
        graphqlOperation(getUsersTable, { id: currentUser.username })
      );
      const user = userData.data.getUsersTable;
      setUserTeam(user.teamstableID);
      console.log("userTeamID", userTeam);
    } catch (error) {
      console.error("Error retrieving user team:", error);
    }
  };

  const handleJoinTeam = async (teamId) => {
    // ensuring user is authenticated before he can join a team
    if (!props.isAuthenticated) {
      console.warn("User is not authenticated");
      alert("Please sign in to join a team.");
      return;
    }
    // Checking if user already has a team
    await fetchUserTeam();
    console.log("userTeam", userTeam);
    if (userTeam) {
      console.warn("User already has a team");
      alert("You already have a team.");
      return;
    }
    console.log("current user", currentUserName);
    try {
      const currentUser = props.userData;
      console.log("current user", currentUser);

      /////////////
      // update the user's Team field
      const inputUser = {
        id: currentUser.Username,
        teamstableID: teamId,
      };
      const updatedUser = await API.graphql(
        graphqlOperation(updateUsersTable, { input: inputUser })
      );
      console.log("updatedUser", updatedUser);

      /////////////
      const teamToUpdate = teams.find((team) => team.id === teamId);
      console.log("teamToUpdate", teamToUpdate);
      if (teamToUpdate) {
        // filter out empty strings from the existing TeamMembers array
        const existingPlayers = teamToUpdate.TeamMembers.filter(Boolean);
        console.log("existingPlayers", existingPlayers);
        // check if the user is already in the game
        const alreadyJoined = existingPlayers.includes(currentUser.username);
        if (alreadyJoined) {
          console.warn("User is already in the team.");
          alert("You are already in the team.");
          return;
        }
        // add the current user to the TeamPlayers array
        const updatedTeamPlayers = [...existingPlayers, currentUser.username];
        console.log("updatedTeamPlayers", updatedTeamPlayers);
        // update the game with the updated GamePlayers array
        const input = {
          id: teamId,
          TeamMembers: updatedTeamPlayers,
        };
        const updatedTeam = await API.graphql(
          graphqlOperation(updateTeamsTable, { input })
        );
        console.log("updatedTeam", updatedTeam);
        // update the local state to trigger a re-render
        const updatedTeams = teams.map((team) => {
          if (team.id === teamId) {
            return updatedTeam.data.updateTeamsTable;
          }
          return team;
        });
        setTeams(updatedTeams);
      }
      alert("You have joined the team!");
      window.location.reload();
    } catch (error) {
      console.error("Error joining team", error);
    }
  };

  const CreateTeamBtnClick = () => {
    if (!props.isAuthenticated) {
      console.warn("User is not authenticated");
      setShowFailAlert(true);
      setTimeout(() => {
        setShowFailAlert(false);
      }, 2000);
      return;
    }
    if (userTeam) {
      navigate("/your-team");
    } else {
      navigate("/create-team");
    }
  };

  // Search Functionalities
  const [query, setQuery] = useState("");

  const teamNames = teams.map((team) => team.TeamName);
  // const filteredTeams = getTeamNames(query, teamNames);

  return (
    <div>
      <div className="team--header">
        <div className="search-team">
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search Teams"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="create-team--btn" onClick={CreateTeamBtnClick}>
          {userTeam && props.isAuthenticated ? "Your Team" : "Create Team"}
        </button>
      </div>
      {showFailAlert ? (
        <>
          <br />
          <Alert
            variation="warning"
            isDismissible={true}
            hasIcon={true}
            heading="Creating Team"
          >
            Please Sign in to Create Team!
          </Alert>
        </>
      ) : null}
      <div className="teams-public">
        <div className="teams-public--header">
          <h1>Public Teams</h1>
        </div>

        <div className="div--public-teams">
          {teams.map((team) => {
            if (team.TeamStatus === "Public" && team.TeamName.includes(query)) {
              return (
                <ul className="ul--list-private-teams" key={team.id}>
                  <li key={team.id} className="li--list-private-teams">
                    <div className="div--team-name">
                      <h3>{team.TeamName}</h3>
                    </div>
                    <div className="div--team-join">
                      <div className="div--team-players">
                        <p>Team Members: {team.TeamMembers.length}</p>
                      </div>
                      <button
                        key={team.id}
                        onClick={() => handleJoinTeam(team.id)}
                        className="btn--join-team"
                      >
                        Join
                      </button>
                    </div>
                  </li>
                </ul>
              );
            }
          })}
          {teams.filter(
            (team) =>
              team.TeamStatus === "Private" && team.TeamName.includes(query)
          ).length === 0 && <p>No teams found.</p>}
        </div>
      </div>

      <div className="teams-private">
        <div className="teams-private--header">
          <h1>Private Teams</h1>
        </div>
        <div className="div--private-teams">
          {teams.map((team) => {
            if (
              team.TeamStatus === "Private" &&
              team.TeamName.includes(query)
            ) {
              return (
                <ul className="ul--list-private-teams" key={team.id}>
                  <li key={team.id} className="li--list-private-teams">
                    <div className="div--team-name">
                      <h3>{team.TeamName}</h3>
                    </div>
                    <div className="div--team-join">
                      <div className="div--team-players">
                        <p>Team Members: {team.TeamMembers.length}</p>
                      </div>
                      <button
                        key={team.id}
                        onClick={() => handleJoinTeam(team.id)}
                        className="btn--join-team"
                      >
                        Join
                      </button>
                    </div>
                  </li>
                </ul>
              );
            }
          })}
          {teams.filter(
            (team) =>
              team.TeamStatus === "Private" && team.TeamName.includes(query)
          ).length === 0 && <p>No teams found.</p>}
        </div>
      </div>
    </div>
  );
}

export default TeamsPublic;
