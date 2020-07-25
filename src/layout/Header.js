//TODO:DONE set NavbarBrand to go to home page and export Header

import React from "react";
import { Navbar, NavbarBrand, NavbarText } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import firebase from 'firebase/app'
import 'firebase/auth'

const Header = ({ loggedIn, setLoggedIn }) => {
  const logOut = () => {
    firebase.auth().signOut().then(() => {
      setLoggedIn(false)
      toast("Signed out successfully!!", {
        type: 'success'
      })
    })
  }
  return (
    <Navbar color="info" light>
      <NavbarBrand tag={Link} to="/" className="text-white">People</NavbarBrand>
      {
        loggedIn ? (

          <NavbarText className="text-white float-right" onClick={logOut}>
            Logout
          </NavbarText>
        ) : (
            <></>
          )
      }
    </Navbar>
  );
};

export default Header
