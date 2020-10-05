import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/sign-up");
  const login = () => history.push("/login-in");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <Button onClick={logout}>Log out</Button>
      ) : (
        <>
          <Button onClick={register}>Register</Button>
          <Button onClick={login}>Log in</Button>
        </>
      )}
    </nav>
  );
}
