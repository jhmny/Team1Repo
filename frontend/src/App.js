import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//These are files for webpage html rendering at specific URLs
import HomePage from "./components/pages/home-page.js";
import AllListings from "./components/pages/all-listings.js";
import AddListings from "./components/pages/add-listing.js";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Checkout from "./components/pages/Checkout";


import Listing from "./components/pages/itemFromDB.js";
import WishList from "./components/pages/Wishlist";
import Sold from "./components/pages/Sold";
import item from "./components/pages/item.js";
import Axios from "axios";
import Header from "./components/layout/header.js";

import UserContext from "./context/UserContext.js";
import Copyright from "./components/layout/Copyright.js";


export const sections  = [
  { title: "Home", url: "/" },
  { title: "Wishlist", url: "/wishlist" },
  { title: "Sold", url: "/sold" },
  { title: "New Listing", url: "/listings/create" },
  { title: "All Listings", url: "/listings" },
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
              <Route path="/wishlist" exact component={WishList} />
              <Route path="/sold" exact component={Sold} />
              <Route path="/listings" exact component={AllListings} />
              <Route path="/listings/create" exact component={AddListings} />
              <Route path="/item" exact component={item} />
              <Route path="/listings/:id" exact component={Listing} />
              <Route path="/Checkout/:id" exact component={Checkout} />
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
