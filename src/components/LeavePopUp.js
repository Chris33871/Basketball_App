import React from "react";
import "./LeavePopUp.css";

function LeavePopUp(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Are you sure you want to leave?</h3>

        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          No
        </button>
        <button
          className="close-btn"
          onClick={(event) => {
            event.preventDefault();
            props.handleLeaveTeam();
          }}
        >
          Yes
        </button>

        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default LeavePopUp;
