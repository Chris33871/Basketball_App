import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "./SessionsList.css";

function SessionsList(props) {
  const [visibleSessionTimes, setVisibleSessionTimes] = useState({});

  const sessions = props.sessions;
  const sessionTimes = props.sessionTimes;

  const toggleSessionTimeVisibility = (location) => {
    setVisibleSessionTimes((prevVisibleSessionTimes) => ({
      ...prevVisibleSessionTimes,
      [location]: !prevVisibleSessionTimes[location],
    }));
  };

  return (
    <div>
      <div className="session--div">
        {sessions
          .sort((a, b) => b.SessionPlayersCount - a.SessionPlayersCount)
          .map((session) => (
            <div key={session.id} className="session--card">
              <div className="session--card--header">
                <h3>{session.SessionLocation}</h3>
              </div>
              {visibleSessionTimes[session.SessionLocation] ? (
                <AiOutlineRight
                  className="session--card--dropdown--icon"
                  onClick={() =>
                    toggleSessionTimeVisibility(session.SessionLocation)
                  }
                />
              ) : (
                <AiOutlineLeft
                  className="session--card--dropdown--icon"
                  onClick={() =>
                    toggleSessionTimeVisibility(session.SessionLocation)
                  }
                />
              )}
              {visibleSessionTimes[session.SessionLocation] && (
                <div className="session--card--times">
                  {sessionTimes
                    .filter(
                      (sessionTime) =>
                        sessionTime.SessionTimeLocation ===
                        session.SessionLocation
                    )
                    .sort((a, b) => {
                      const aTime = a.SessionTimeTime.split(":");
                      const bTime = b.SessionTimeTime.split(":");
                      return aTime[0] - bTime[0] || aTime[1] - bTime[1];
                    })
                    .map((sessionTime) => (
                      <div
                        key={sessionTime.id}
                        className="session--card--dropdown"
                      >
                        <p>{sessionTime.SessionTimeTime}</p>
                        {/* <button
            className="session--card--dropdown--join"
            onClick={props.joinSessionTime}
          >
            Join
          </button> */}
                        <p className="session--card--dropdown--players">
                          Players attending:{" "}
                          {sessionTime.SessionTimePlayersCount}
                        </p>
                      </div>
                    ))}
                </div>
              )}
              <div className="session--card--player-count">
                <p>Players: {session.SessionPlayersCount}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SessionsList;
