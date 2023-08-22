import React, { useState } from "react";
import "./CreateSession.css";
import {
  createSessionTimesTable,
  createSessionsTable,
  updateSessionTimesTable,
  updateSessionsTable,
} from "../graphql/mutations";
import { graphqlOperation, API } from "aws-amplify";
import { getSessionTimesTable } from "../graphql/queries";
import { Alert } from "@aws-amplify/ui-react";

function CreateSession(props) {
  const [sessionData, setSessionData] = useState({
    sessionLocation: "",
    sessionTime: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const updateSessionData = (e) => {
    const { name, value } = e.target;
    setSessionData((prevSessionData) => {
      return {
        ...prevSessionData,
        [name]: value,
      };
    });
    // make the session location saved as caps
    if (name === "sessionLocation") {
      setSessionData((prevSessionData) => {
        return {
          ...prevSessionData,
          [name]: value.toUpperCase(),
        };
      });
    }
  };
  console.log("props userdata", props.userData.userData);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const sessions = props.sessions;
    const sessionTimes = props.sessionTimes;
    const userEmail = props.userData.userData.Email;
    console.log("User Email", userEmail);

    // Check if the user is logged in
    if (
      userEmail === "" ||
      userEmail === undefined ||
      props.userData === null ||
      props.userData === undefined ||
      props.userData === {} ||
      props.userData === []
    ) {
      console.log("User is not logged in");
      alert("You must be logged in to create a session");
      return;
    }

    // Check that the has entered something
    if (sessionData.sessionLocation === "" || sessionData.sessionTime === "") {
      console.log("Session location or time is empty");
      alert("Session location or time is empty");
      return;
    }

    try {
      // Check that a session does not already exist
      const sessionExists = sessions.some(
        (session) => session.SessionLocation === sessionData.sessionLocation
      );
      if (sessionExists) {
        // Select the included session
        const existingSession = sessions.find(
          (existingSession) =>
            existingSession.SessionLocation === sessionData.sessionLocation
        );
        console.log("Existing Session", existingSession);

        // Check that a session Time does not already exist
        const sessionTimeExists = sessionTimes.some(
          (sessionTime) =>
            sessionTime.SessionTimeLocation === sessionData.sessionLocation &&
            sessionTime.SessionTimeTime === sessionData.sessionTime
        );
        const existingSessionTime = sessionTimes.find(
          (existingSessionTime) =>
            existingSessionTime.SessionTimeLocation ===
              sessionData.sessionLocation &&
            existingSessionTime.SessionTimeTime === sessionData.sessionTime
        );
        console.log("Existing Session Time", existingSessionTime);

        // If session and session time exist, update the session time
        if (sessionTimeExists) {
          console.log("SessionTimeExists", sessionTimeExists);
          console.log("Session and session time exists");
          //Getting the current data (the data the we want to update)
          const currentSessionTime = await API.graphql(
            graphqlOperation(getSessionTimesTable, {
              id: existingSessionTime.id,
              fields: ["id", "SessionTimePlayers", "SessionTimePlayersCount"],
            })
          );
          console.log("Current Session Time", currentSessionTime.data);
          // Check that the user is not already in the session
          // check for null values first
          if (
            currentSessionTime.data.getSessionTimesTable.SessionTimePlayers ===
              null ||
            currentSessionTime.data.getSessionTimesTable.SessionTimePlayers ===
              undefined ||
            currentSessionTime.data.getSessionTimesTable.SessionTimePlayers ===
              [] ||
            currentSessionTime.data.getSessionTimesTable.SessionTimePlayers ===
              {}
          ) {
            console.log("No players in session");
          } else {
            const userAlreadyInSession =
              currentSessionTime.data.getSessionTimesTable.SessionTimePlayers.some(
                (player) => player === userEmail
              );

            if (userAlreadyInSession) {
              console.log("User already in session");
              alert("You are already in this session");
              return;
            }
          }

          console.log(
            "Current Session Time past user check",
            currentSessionTime.data
          );
          const sessionTimeId = currentSessionTime.data.getSessionTimesTable.id;
          console.log(
            currentSessionTime.data.getSessionTimesTable.SessionTimePlayers
          );
          const updatedSessionTimePlayers = [
            ...currentSessionTime.data.getSessionTimesTable.SessionTimePlayers,
            userEmail,
          ];
          console.log("Session Time ID", sessionTimeId);
          console.log(
            "Updated Session Time Players",
            updatedSessionTimePlayers
          );

          // Updating the session Time
          const updatedSessionTime = await API.graphql(
            graphqlOperation(updateSessionTimesTable, {
              input:
                {
                  id: sessionTimeId,
                  SessionTimePlayers: updatedSessionTimePlayers,
                  SessionTimePlayersCount:
                    currentSessionTime.data.getSessionTimesTable
                      .SessionTimePlayersCount + 1,
                } || {},
            })
          );
          console.log("Updated Session Time", updatedSessionTime.data);

          // update the session
          const updatedSession = await API.graphql(
            graphqlOperation(updateSessionsTable, {
              input: {
                id: existingSession.id,
                SessionPlayers: [...existingSession.SessionPlayers, userEmail],
                SessionPlayersCount: existingSession.SessionPlayersCount + 1,
              },
            })
          );
          console.log("Updated Session", updatedSession.data);
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 2000);
          alert("The session Time already exits, you have been added to it");
          window.location.reload();
          // If session exists but session time doesn't, create the session time
        } else {
          console.log("Session exists but session time doesn't");
          const addSessionTime = await API.graphql(
            graphqlOperation(createSessionTimesTable, {
              input: {
                SessionTableId: existingSession.id,
                SessionTimeLocation: sessionData.sessionLocation,
                SessionTimePlayers: userEmail,
                SessionTimePlayersCount: 1,
                SessionTimeTime: sessionData.sessionTime,
                SessionTimeDate: new Date().toISOString().slice(0, 10),
              },
            })
          );
          console.log("Created Session Time", addSessionTime.data);
          // update the session
          const updatedSession = await API.graphql(
            graphqlOperation(updateSessionsTable, {
              input: {
                id: existingSession.id,
                SessionPlayers: [...existingSession.SessionPlayers, userEmail],
                SessionPlayersCount: existingSession.SessionPlayersCount + 1,
              },
            })
          );
          console.log("Updated Session", updatedSession.data);
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 2000);
          window.location.reload();
          alert(
            "The session already exits, you have been added to the session time"
          );
        }
        // If Session and session Time don't exist, create them
      } else {
        console.log("Session and Session time don't exist");
        //Create Session and Session time for that session
        const addSession = await API.graphql(
          graphqlOperation(createSessionsTable, {
            input: {
              SessionLocation: sessionData.sessionLocation,
              SessionPlayers: userEmail,
              SessionPlayersCount: 1,
            },
          })
        );
        console.log("Created Session", addSession.data);
        const addSessionTime = await API.graphql(
          graphqlOperation(createSessionTimesTable, {
            input: {
              SessionTableId: addSession.data.createSessionsTable.id,
              SessionTimeLocation: sessionData.sessionLocation,
              SessionTimePlayers: userEmail,
              SessionTimePlayersCount: 1,
              SessionTimeTime: sessionData.sessionTime,
              SessionTimeDate: new Date().toISOString().slice(0, 10),
            },
          })
        );
        console.log("Created Session Time", addSessionTime.data);
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 2000);
        alert(
          "The session and session time have been created (and you have been added to it)"
        );
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating session", error);
    }
  };

  return (
    <div>
      <div className="create-session--div">
        <form className="create-session--form" onSubmit={handleFormSubmit}>
          <label htmlFor="SessionLocation" className="create-session--label">
            Enter Location:
          </label>
          <input
            type="text"
            id="sessionLocation"
            className="create-session--input"
            name="sessionLocation"
            placeholder="Location"
            value={sessionData.sessionLocation}
            onChange={updateSessionData}
          />
          <label htmlFor="SessionTime" className="create-session--label">
            Attending at
          </label>
          <select
            className="create-session--select"
            id="sessionTime"
            name="sessionTime"
            onChange={updateSessionData}
            value={sessionData.sessionTime}
          >
            <option disabled={true} value="">
              -- Select Time --
            </option>
            <option value="09:00:00">9:00 AM</option>
            <option value="09:30:00">9:30 AM</option>
            <option value="10:00:00">10:00 AM</option>
            <option value="10:30:00">10:30 AM</option>
            <option value="11:00:00">11:00 AM</option>
            <option value="11:30:00">11:30 AM</option>
            <option value="12:00:00">12:00 PM</option>
            <option value="12:30:00">12:30 PM</option>
            <option value="13:00:00">1:00 PM</option>
            <option value="13:30:00">1:30 PM</option>
            <option value="14:00:00">2:00 PM</option>
            <option value="14:30:00">2:30 PM</option>
            <option value="15:00:00">3:00 PM</option>
            <option value="15:30:00">3:30 PM</option>
            <option value="16:00:00">4:00 PM</option>
            <option value="16:30:00">4:30 PM</option>
            <option value="17:00:00">5:00 PM</option>
            <option value="17:30:00">5:30 PM</option>
            <option value="18:00:00">6:00 PM</option>
            <option value="18:30:00">6:30 PM</option>
            <option value="19:00:00">7:00 PM</option>
            <option value="19:30:00">7:30 PM</option>
            <option value="20:00:00">8:00 PM</option>
          </select>

          <button type="submit" className="create-session--button">
            Create / Join Session
          </button>
        </form>
        {showSuccessAlert ? (
          <Alert
            variation="success"
            isDismissible={true}
            hasIcon={true}
            heading="Creating Session"
          >
            Successfully Created Session!
          </Alert>
        ) : null}
      </div>
    </div>
  );
}

export default CreateSession;
