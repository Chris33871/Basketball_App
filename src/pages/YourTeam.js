import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateUsersTable, updateTeamsTable } from "../graphql/mutations";
import { listTeamsTables } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import "./YourTeam.css";
import LeavePopUp from "../components/LeavePopUp";

function YourTeam(props) {
  const [userId, setUserId] = useState("");
  const [currentUserTeamData, setCurrentUserTeamData] = useState([]);

  //Getting the current user's ID
  const fetchUserId = useCallback(async () => {
    try {
      setUserId(props.user.username);
    } catch (error) {
      console.error("Error retrieving user:", error);
    }
  }, [props]);

  useEffect(() => {
    if (props.user && !userId) {
      fetchUserId();
    }
  }, [props.user, userId, fetchUserId]);

  //Fetch Current User's Team
  useEffect(() => {
    fetchUserTeam();
  }, [props.userData]);

  const fetchUserTeam = async () => {
    try {
      const teamsData = await API.graphql(graphqlOperation(listTeamsTables));
      const teams = teamsData.data.listTeamsTables.items;
      const currentUserTeam = teams.find(
        (team) => team.id === props.userData.teamstableID
      );
      //   console.log("currentTeam", currentUserTeam);
      setCurrentUserTeamData(currentUserTeam);
      //   console.log("currentUserTeamData", currentUserTeamData);
    } catch (error) {
      console.error("Error retrieving user's Team:", error);
    }
  };

  //Update Team Status
  const [teamStatus, setTeamStatus] = useState("");
  const handleTeamStatus = async (event) => {
    event.preventDefault();
    try {
      const teamData = {
        id: currentUserTeamData.id,
        TeamStatus: teamStatus,
      };
      await API.graphql(
        graphqlOperation(updateTeamsTable, { input: teamData })
      );
      console.log("Team Status Updated to", teamStatus);
    } catch (error) {
      console.error("Error updating Team Status:", error);
    }
  };

  //Leave Team
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();
  const handleLeaveTeam = async (event) => {
    // event.preventDefault();
    try {
      const userData = {
        id: props.userData.id,
        teamstableID: "",
      };
      await API.graphql(
        graphqlOperation(updateUsersTable, { input: userData })
      );
      const teamDataMembers = {
        id: currentUserTeamData.id,
        TeamMembers: currentUserTeamData.TeamMembers.filter(
          (player) => player !== props.userData.Email
        ),
      };
      await API.graphql(
        graphqlOperation(updateTeamsTable, { input: teamDataMembers })
      );
      console.log("User Team ID Updated");
      console.log("User Left Team");
      console.log("Team Updated", teamDataMembers);
      setButtonPopup(false);
      navigate("/teams");
    } catch (error) {
      console.error("Error updating User Team ID:", error);
    }
  };

  return (
    <div>
      <div className="yourteam--title">
        {currentUserTeamData ? (
          <h1>{currentUserTeamData.TeamName}</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="yourteam--content">
        <div className="yourteam--content--mainview">
          <div className="yourteam--feed--title">
            <h2>News / Feed</h2>
          </div>
          <div className="yourteam--mainview--feed">
            <div className="yourteam--feed--info">
              <p>Notifications Coming Soon</p>
              <p>Notifications Coming Soon</p>
              <p>Notifications Coming Soon</p>
              <p>Notifications Coming Soon</p>
              <p>Notifications Coming Soon I promise</p>
            </div>
          </div>
          <div className="yourteam--players--title">
            <h2>Players</h2>
          </div>
          <div className="yourteam--mainview--players">
            <div className="yourteam--players--info">
              {currentUserTeamData &&
              currentUserTeamData.TeamName &&
              props.userData ? (
                <ul className="ul--players--info">
                  {currentUserTeamData.TeamMembers.map((player, index) => (
                    <li className="li--players--info" key={index}>
                      <p>{player}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>

        <div className="yourteam--content--settings">
          <div className="yourteam--settings--title">
            <h2>Settings</h2>
          </div>

          <div className="yourteam--settings--info">
            <label className="settings--label">
              Team Status:
              {currentUserTeamData &&
              currentUserTeamData.TeamName &&
              props.userData &&
              currentUserTeamData.TeamStatus === "Public" ? (
                <select
                  className="yourteam--settings--info--select"
                  name="teamStatus"
                  id="teamStatus"
                  value={teamStatus}
                  onChange={(e) => {
                    setTeamStatus(e.target.value);
                  }}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              ) : (
                <select
                  className="yourteam--settings--info--select"
                  name="teamStatus"
                  id="teamStatus"
                  value={teamStatus}
                  onChange={(e) => {
                    setTeamStatus(e.target.value);
                  }}
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              )}
            </label>

            {/* <div> */}
            <button className="settings--save--btn" onClick={handleTeamStatus}>
              Save
            </button>
            {/* </div> */}

            {/* <div className="settings--leave-team"> */}
            <button
              className="settings--leave-team--btn"
              onClick={(event) => {
                event.preventDefault();
                setButtonPopup(true);
              }}
            >
              Leave Team
            </button>
            <LeavePopUp
              trigger={buttonPopup}
              setTrigger={setButtonPopup}
              handleLeaveTeam={handleLeaveTeam}
              className="leave-popup"
            ></LeavePopUp>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourTeam;
