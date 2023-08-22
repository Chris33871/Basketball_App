import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listUsersTables, getUsersTable } from "./graphql/queries";

import Games from "./pages/Games";
import Sessions from "./pages/Sessions";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";
import Teams from "./pages/Teams";
import CreateGame from "./pages/CreateGame";
import CreateTeam from "./pages/CreateTeam";
import YourTeam from "./pages/YourTeam";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    authenticateUser();
  }, []);

  // check authentication
  const authenticateUser = async () => {
    console.log("App.js authenticateUser function called");
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      }
      // console.log("cognito user from app.js", user);
    } catch (error) {
      console.error("Error authenticating user:", error);
    }
    // console.log("cognito runs", user);
  };

  // get user data
  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    console.log("App.js fetchUsersData function called");
    try {
      const authedUser = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(getUsersTable, { id: authedUser.username })
      );
      const currentUser = userData.data.getUsersTable;
      setUserData(currentUser);
      console.log("IndividualUserData", currentUser);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Games userData={userData} />} />
        <Route path="/home" element={<Sessions userData={userData} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/teams"
          element={
            <Teams
              isAuthenticated={isAuthenticated}
              user={user}
              userData={userData}
            />
          }
        />
        <Route path="/create-game" element={<CreateGame />} />
        <Route
          path="/create-team"
          element={<CreateTeam user={user} userData={userData} />}
        />
        <Route
          path="/your-team"
          element={<YourTeam user={user} userData={userData} />}
        />
      </Routes>
    </>
  );
}

export default App;
