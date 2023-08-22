import React, { useEffect, useState } from "react";
import "./Sessions.css";
import SessionsList from "../components/SessionsList";
import CreateSession from "../components/CreateSession";

import { API, graphqlOperation } from "aws-amplify";
import {
  listSessionsTables,
  listSessionTimesTables,
  getSessionTimesTable,
  getSessionsTable,
} from "../graphql/queries";
import {
  updateSessionsTable,
  updateSessionTimesTable,
} from "../graphql/mutations";

const showSessions = (query, sessions) => {
  if (!query) {
    return sessions;
  }
  return sessions.SessionLocations.filter((sessionLocation) =>
    sessionLocation.toUpperCase().includes(query.toUpperCase())
  );
};

function Sessions(userData) {
  const [sessions, setSessions] = useState([]);
  const [sessionTimes, setSessionTimes] = useState([]);

  // Search functionality
  // const [query, setQuery] = useState("");
  // const sessionLocations = sessions.map((session) => session.SessionLocation);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    fetchSessionTimes();
  }, []);

  const fetchSessions = async () => {
    console.log("Sessions.js fetchSessions function called");
    try {
      const sessionsData = await API.graphql(
        graphqlOperation(listSessionsTables, { limit: 20 })
      );
      const sessions = sessionsData.data.listSessionsTables.items.map(
        (session) => ({
          ...session,
          // ensure the GamePlayers array is not null or undefined
          SessionPlayers: session.SessionPlayers ? session.SessionPlayers : [],
        })
      );
      // console.log("sessions", sessions);
      setSessions(sessions);
    } catch (error) {
      console.error("Error retrieving sessions:", error);
    }
  };

  const fetchSessionTimes = async () => {
    console.log("Sessions.js fetchSessionTimes function called");
    try {
      const sessionTimesData = await API.graphql(
        graphqlOperation(listSessionTimesTables, { limit: 50 })
      );
      const sessionTimes =
        sessionTimesData.data.listSessionTimesTables.items.map(
          (sessionTime) => ({
            ...sessionTime,
            SessionTimePlayers: sessionTime.SessionTimePlayers
              ? sessionTime.SessionTimePlayers
              : [],
          })
        );
      // console.log("SessionTimes", sessionTimes);
      setSessionTimes(sessionTimes);
    } catch (error) {
      console.error("Error retrieving session Times", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      resetPlayerCounts();
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  // Refresh the player counts every 24 hours
  const resetPlayerCounts = async () => {
    console.log("Sessions.js resetPlayerCounts function called");
    try {
      // Get all session times for the current day
      const sessionTimesData = await API.graphql(
        graphqlOperation(getSessionTimesTable, {
          filter: {
            SessionTimeDate: { eq: new Date().toISOString().slice(0, 10) },
          },
        })
      );
      const sessionTimes = sessionTimesData.data.getSessionTimesTable.items;

      // Reset the player counts for each session time
      const resetSessionTimes = sessionTimes.map((sessionTime) => ({
        ...sessionTime,
        SessionTimePlayers: [],
        SessionTimePlayersCount: 0,
      }));
      await Promise.all(
        resetSessionTimes.map((sessionTime) =>
          API.graphql(
            graphqlOperation(updateSessionTimesTable, {
              input: {
                id: sessionTime.id,
                SessionTimePlayers: [],
                SessionTimePlayersCount: 0,
              },
            })
          )
        )
      );

      // Get all sessions
      const sessionsData = await API.graphql(
        graphqlOperation(getSessionsTable, { limit: 20 })
      );
      const sessions = sessionsData.data.getSessionsTable.items;

      // Reset the player counts for each session
      const resetSessions = sessions.map((session) => ({
        ...session,
        SessionPlayers: [],
        SessionPlayersCount: 0,
      }));
      await Promise.all(
        resetSessions.map((session) =>
          API.graphql(
            graphqlOperation(updateSessionsTable, {
              input: {
                id: session.id,
                SessionPlayers: [],
                SessionPlayersCount: 0,
              },
            })
          )
        )
      );
    } catch (error) {
      console.error("Error resetting player counts:", error);
    }
  };

  // Join session time
  const joinSessionTime = async (sessionTimeId, sessionTimePlayers) => {
    console.log("Sessions.js joinSessionTime function called");
    try {
      const sessionTimeData = await API.graphql(
        graphqlOperation(getSessionTimesTable, { id: sessionTimeId })
      );
      const sessionTime = sessionTimeData.data.getSessionTimesTable;

      const updatedSessionTimePlayers = [
        ...sessionTime.SessionTimePlayers,
        sessionTimePlayers,
      ];
      const updatedSessionTimePlayersCount = updatedSessionTimePlayers.length;

      const updatedSessionTimeData = await API.graphql(
        graphqlOperation(updateSessionTimesTable, {
          input: {
            id: sessionTimeId,
            SessionTimePlayers: updatedSessionTimePlayers,
            SessionTimePlayersCount: updatedSessionTimePlayersCount,
          },
        })
      );
      const updatedSessionTime =
        updatedSessionTimeData.data.updateSessionTimesTable;
      console.log("updatedSessionTime", updatedSessionTime);

      // update the relevant session
      const sessionData = await API.graphql(
        graphqlOperation(getSessionsTable, {
          id: updatedSessionTime.SessionTimeSessionId,
        })
      );
      const session = sessionData.data.getSessionsTable;

      const updatedSessionPlayers = [
        ...session.SessionPlayers,
        sessionTimePlayers,
      ];
      const updatedSessionPlayersCount = updatedSessionPlayers.length;

      const updatedSessionData = await API.graphql(
        graphqlOperation(updateSessionsTable, {
          input: {
            id: updatedSessionTime.SessionTimeSessionId,
            SessionPlayers: updatedSessionPlayers,
            SessionPlayersCount: updatedSessionPlayersCount,
          },
        })
      );
      const updatedSession = updatedSessionData.data.updateSessionsTable;
      console.log("updatedSession", updatedSession);

      // update state
      const sessionTimes = [...sessionTimes];
      const index = sessionTimes.findIndex(
        (sessionTime) => sessionTime.id === updatedSessionTime.id
      );
      sessionTimes[index] = updatedSessionTime;
      setSessionTimes(sessionTimes);

      const sessions = [...sessions];
      const sessionIndex = sessions.findIndex(
        (session) => session.id === updatedSession.id
      );
      sessions[sessionIndex] = updatedSession;
      setSessions(sessions);

      alert("You have successfully joined the session time!");
    } catch (error) {
      console.error("Error joining session time:", error);
    }
  };

  return (
    <div className="game--page">
      {/* <div className="search-team">
        <FaSearch className="search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Search Teams"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div> */}

      <div className="game--content">
        <div className="game--filters">
          <div className="game--filters--header">
            <h1>Create / Join Session</h1>
          </div>
          <CreateSession
            userData={userData}
            sessions={sessions}
            sessionTimes={sessionTimes}
          />
        </div>

        <div className="game--list">
          <div className="game--list--header">
            <h1>Popular Locations</h1>
          </div>
          <SessionsList
            userData={userData}
            sessions={sessions}
            sessionTimes={sessionTimes}
            showSessions={showSessions}
            joinSessionTime={joinSessionTime}
          />
        </div>
      </div>
      <p className="game--footer">
        <span className="game--footer--bold">Disclaimer:&nbsp; </span> Other
        than the dummy data, all other data on this page will be refresh daily.
      </p>
    </div>
  );
}

export default Sessions;
