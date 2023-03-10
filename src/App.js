import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(null);
  const [tokenExpiryDate, setTokenExpiryDate] = useState();
  const [userID, setUserID] = useState(null);

  const login = useCallback((userID, token, tokenExpiry) => {
    setToken(token);
    setUserID(userID);
    const tokenExpiryDate =
      tokenExpiry || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpiryDate(tokenExpiryDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userID: userID,
        token: token,
        tokenExpiry: tokenExpiryDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserID(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.tokenExpiry) > new Date()
    ) {
      login(userData.userID, userData.token, new Date(userData.tokenExpiry));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpiryDate) {
      const remainTime = tokenExpiryDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiryDate]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userID: userID,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
