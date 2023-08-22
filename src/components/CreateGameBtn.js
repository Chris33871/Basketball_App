import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Games.css";
import "./CreateGameBtn.css";

function CreateGameBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-game");
  };

  return (
    <div>
      <button className="create-game--btn" onClick={handleClick}>
        Create Game
      </button>
    </div>
  );
}

export default CreateGameBtn;
