import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//These are files for webpage html rendering at specific URLs
import HomePage from "./routes/home-page.js";
import AllUsers from "./routes/all-users.js";
import AddUser from "./routes/add-user.js";
import AllListings from "./routes/all-listings.js";

import userLogin from "./routes/login-user.js";
import good from "./routes/good.js";
import bad from "./routes/bad.js";
import SignUp from "./routes/sign-up.js";
import SignIn from "./routes/sign-in.js";
import item from "./routes/item.js";

function App() {
  //Router defines what paths exists, and what files they grab.
  return (
    <Router>
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
    </Router>
  );
}

export default App;
