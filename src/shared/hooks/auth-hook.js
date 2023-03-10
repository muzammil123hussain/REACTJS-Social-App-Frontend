import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
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
    setTokenExpiryDate(null);
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

  return { token, login, logout, userID };
};
