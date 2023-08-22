import React, { useState, useEffect, useCallback } from "react";
import "./CreateTeam.css";
import { createTeamsTable, updateUsersTable } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { Alert } from "@aws-amplify/ui-react";

function CreateTeam(props) {
  const [userId, setUserId] = useState("");
  const [currentUserData, setCurrentUserData] = useState([]);
  const navigate = useNavigate();
  const [showFailAlert, setShowFailAlert] = useState(false);

  //Getting the current user's ID
  const fetchUserId = useCallback(async () => {
    // console.log("props", props);
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

  const [teamData, setTeamData] = useState({
    teamName: "",
    teamStatus: "",
  });

  function updateTeam(event) {
    setTeamData((prevTeamData) => {
      return { ...prevTeamData, [event.target.name]: event.target.value };
    });
  }
  if (!userId) {
    return (
      <div className="unauthenticated--div">
        <p>Please sign in to create a team.</p>
        <button onClick={() => navigate("/login")}>Sign in</button>
      </div>
    );
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (userId === undefined || userId === "" || userId === null) {
      alert("Please sign in to create a team.");
      navigate("/login");
      return;
    }
    if (teamData.teamName === "") {
      setShowFailAlert(true);
      setTimeout(() => {
        setShowFailAlert(false);
      }, 3000);
      return;
    }
    if (teamData.teamStatus !== "Public" && teamData.teamStatus !== "Private") {
      setShowFailAlert(true);
      setTimeout(() => {
        setShowFailAlert(false);
      }, 3000);
      console.warn("Please select a team status.");
      return;
    }
    //Check if user already has a team
    if (props.userData.teamstableID) {
      alert("You already have a team.");
      // Change this to navigate to the user's team page
      navigate("/your-team");
      return;
    }

    try {
      const newTeam = await API.graphql(
        graphqlOperation(createTeamsTable, {
          input: {
            TeamName: teamData.teamName,
            TeamOwner: props.user.attributes.email,
            TeamStatus: teamData.teamStatus,
            TeamMembers: [props.user.attributes.email],
          },
        })
      );
      console.log("newTeam", newTeam);
      console.log(
        "newTeam.data.createTeamsTable.id",
        newTeam.data.createTeamsTable.id
      );
      const updatedUser = await API.graphql(
        graphqlOperation(updateUsersTable, {
          input: {
            id: userId,
            teamstableID: newTeam.data.createTeamsTable.id,
          },
        })
      );
      console.log("updatedUser", updatedUser);
      alert("Team created!");
      navigate("/teams");
    } catch (error) {
      console.error("Error creating team:", error);
    }

    // Reset Form Fields
    setTeamData({
      TeamName: "",
      TeamStatus: "",
    });
  };

  return (
    <div>
      <br />
      <br />
      {showFailAlert ? (
        <>
          <Alert
            variation="warning"
            isDismissible={true}
            hasIcon={true}
            heading="Creating Team"
          >
            Error Creating Team!
          </Alert>
          <br />
        </>
      ) : null}
      <div className="div--create-team">
        <form onSubmit={handleFormSubmit} className="form--create-team">
          <label htmlFor="teamName" className="label--team-name">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            onChange={updateTeam}
            value={teamData.teamName}
            className="input--team-name"
          />
          <label htmlFor="teamStatus" className="label--team-status">
            Team Status
          </label>
          <select
            type="text"
            id="teamStatus"
            name="teamStatus"
            onChange={updateTeam}
            value={teamData.teamStatus}
            className="select--team-status"
          >
            <option disabled={true} value="">
              -- Select Team Status --
            </option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <button type="submit" className="button--submit">
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTeam;
