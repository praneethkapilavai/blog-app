import React, { useContext, useEffect } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/react";
import { UserAuthorContextObj } from "../contexts/UserAuthorContext";

export function RootLayout() {

  const { currentUser, setCurrentUser } = useContext(UserAuthorContextObj);

  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {

    if (isLoaded && isSignedIn && user) {

      setCurrentUser(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        profileImageUrl: user.imageUrl || ""
      }));

    }

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