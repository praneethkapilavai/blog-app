import React, { useContext, useEffect } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/react";
import { UserAuthorContextObj } from "../contexts/UserAuthorContext";
import axios from 'axios'

export function RootLayout() {

  const { currentUser, setCurrentUser } = useContext(UserAuthorContextObj);

  const { user, isLoaded, isSignedIn } = useUser();
  // console.log("from root",currentUser)

  useEffect(() => {

    async function fetchUser(){
      if (isLoaded && isSignedIn && user) {
          let resp = await axios.get(`http://localhost:3000/author-api/getrole/${user.emailAddresses[0]?.emailAddress}`)
          setCurrentUser(resp.data.payload)
      }
    }

    fetchUser()


  }, [isLoaded, isSignedIn, user]);

  return (
    <div>
      <Header />

      <div
        style={{ minHeight: "86vh" }}
        className="container pt-4"
      >
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default RootLayout;