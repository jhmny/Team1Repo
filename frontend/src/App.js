import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//These are files for webpage html rendering at specific URLs
import HomePage from "./components/pages/home-page.js";
import AllUsers from "./components/pages/all-users.js";
import AddUser from "./components/pages/add-user.js";
import AllListings from "./components/pages/all-listings.js";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import good from "./components/pages/good.js";
import bad from "./components/pages/bad.js";
import item from "./components/pages/item.js";
import Axios from "axios";
import Header from "./components/layout/header.js";

import UserContext from "./context/UserContext.js";
import Copyright from "./components/layout/Copyright.js";

export const sections = [
  { title: "Home", url: "/" },
  { title: "Shirts", url: "#" },
  { title: "Pants", url: "#" },
  { title: "Shoes", url: "#" },
  { title: "Hamsters ", url: "#" },
  { title: " ", url: "#" },
  { title: " ", url: "#" },
  { title: " ", url: "#" },
  { title: " ", url: "#" },
  { title: " ", url: "#" },
];

export default function App() {
  //Router defines what paths exists, and what files they grab.
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:4000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:4000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header title="threadRepo" sections={sections} />
          <div className="container">
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/users" exact component={AllUsers} />
              <Route path="/users/add" exact component={AddUser} />
              <Route path="/listings" exact component={AllListings} />
              <Route path="/good" exact component={good} />
              <Route path="/bad" exact component={bad} />
              <Route path="/item" exact component={item} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </div>
          <Copyright />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
