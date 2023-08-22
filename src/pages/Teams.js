import React from "react";
import TeamsList from "../components/TeamsList";
import "./Teams.css";

function Teams(props) {
  console.log("Teams props", props);
  const isAuthenticated = props.isAuthenticated;
  // wait for user data to load

  return (
    <div className="teams--page">
      <div className="teams--content">
        <TeamsList
          isAuthenticated={isAuthenticated}
          // userId={props.userData ? props.user.attributes.sub : null}
          userData={props.userData}
        />
      </div>
    </div>
  );
}

export default Teams;
