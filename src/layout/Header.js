//TODO:DONE set NavbarBrand to go to home page and export Header

import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavbarText } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import firebase from 'firebase/app'
import 'firebase/auth'
import { ContactContext } from "../context/Context";

import { SET_IS_LOGGEDIN, SET_CURRENT_USER } from "../context/action.types";
import { Redirect } from 'react-router-dom'
const Header = () => {
  const { state, dispatch } = useContext(ContactContext);
  const { isLoggedIn } = state;

  const logOut = () => {
    firebase.auth().signOut().then(() => {
      dispatch({
        type: SET_IS_LOGGEDIN,
        payload: false
      })
      dispatch({
        type: SET_CURRENT_USER,
        payload: null
      })
      toast("Signed out successfully!!", {
        type: 'success'
      })
      return <Redirect to='/' />
    })


  }
  return (
    <Navbar color="info" light>
      <NavbarBrand tag={Link} to="/" className="text-white">People</NavbarBrand>
      {
        isLoggedIn ? (

          <NavbarText className="text-white float-right" onClick={logOut} style={{ cursor: 'pointer' }}>
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
