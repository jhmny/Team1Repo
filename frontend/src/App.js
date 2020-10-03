import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//These are files for webpage html rendering at specific URLs
import HomePage from "./components/pages/home-page.js";
import AllUsers from "./components/pages/all-users.js";
import AddUser from "./components/pages/add-user.js";
import AllListings from "./components/pages/all-listings.js";

import userLogin from "./components/pages/login-user.js";
import good from "./components/pages/good.js";
import bad from "./components/pages/bad.js";
import SignUp from "./components/pages/sign-up.js";
import SignIn from "./components/pages/sign-in.js";
import item from "./components/pages/item.js";

import Header from "./components/layout/header.js";

function App() {
  //Router defines what paths exists, and what files they grab.
  return (
    <Router>
      <Header title="threadRepo" sections={sections} />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" exact component={AllUsers} />
        <Route path="/users/add" exact component={AddUser} />
        <Route path="/listings" exact component={AllListings} />
        <Route path="/login" exact component={userLogin} />
        <Route path="/good" exact component={good} />
        <Route path="/bad" exact component={bad} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/item" exact component={item} />
      </Switch>
    </Router>
  );
}

export const sections = [
  { title: "Home", url: "/" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

export default App;
