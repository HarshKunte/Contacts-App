import React, { useReducer, useEffect, useState } from "react";

import { Container, Col, Row, Jumbotron, Button } from "reactstrap";
import { FaGooglePlus } from 'react-icons/fa'
// react-router-dom3
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// react toastify stuffs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// firebase stuffs
//TODO:DONE import firebase config and firebase database
import { firebaseConfig } from './utils/config'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'
// components
import AddContact from "./pages/AddContact";
import Contacts from "./pages/Contacts";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ViewContact from "./pages/ViewContact";
import PageNotFound from "./pages/PageNotFound";

// context api stuffs
//TODO:DONE import reducers and contexts
import reducer from './context/reducer'
import { ContactContext } from './context/Context'
// import { SET_CONTACT, SET_LOADING, SET_CURRENT_USER, SET_IS_LOGGEDIN } from './context/action.types'
//initlizeing firebase app with the firebase config which are in ./utils/firebaseConfig
//TODO: initialize FIREBASE
// const app = firebase.initializeApp(firebaseConfig)

// first state to provide in react reducer
const initialState = {
  currentUser: null,
  contacts: [],
  contact: {},
  contactToUpdate: null,
  contactToUpdateKey: null,
  isLoading: false,
  isLoggedIn: false
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loggedIn, setLoggedIn] = useState(false)

  // will get contacts from firebase and set it on state contacts array
  // const getContacts = async () => {
  //   // TODO: load existing data
  //   dispatch({
  //     type: SET_LOADING,
  //     payload: true
  //   })
  //   const userId = firebase.auth().currentUser.uid
  //   const contactsRef = await firebase.database().ref('/users/' + userId + '/contacts')
  //   contactsRef.on('value', snapshot => {
  //     dispatch({
  //       type: SET_CONTACT,
  //       payload: snapshot.val()
  //     })
  //     dispatch({
  //       type: SET_LOADING,
  //       payload: false
  //     })
  //   })
  // };

  // getting contact  when component did mount


  // useEffect(() => {
  //   app.auth().onAuthStateChanged((user) => {
  //     console.log(user)
  //     dispatch({
  //       type: SET_CURRENT_USER,
  //       payload: user
  //     })
  //     setLoggedIn(true)
  //     if (user) {
  //       try {
  //         firebase.database()
  //           .ref('users/' + user.uid + '/info')
  //           .set({
  //             name: user.displayName, email: user.email
  //           })
  //         getContacts()
  //         dispatch({
  //           type: SET_IS_LOGGEDIN,
  //           payload: true
  //         })
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     else {
  //       dispatch({
  //         type: SET_IS_LOGGEDIN,
  //         payload: false
  //       })

  //     }
  //   })
  // }, [])


  return (
    <Router>
      <ContactContext.Provider value={{ state, dispatch }}>
        <ToastContainer />
        <Header />

        <Container>

          <Switch>
            <Route exact path="/contact/add" component={AddContact} />
            <Route exact path="/contact/view" component={ViewContact} />
            <Route exact path="/" component={Contacts} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </Container>
      </ContactContext.Provider>
    </Router>
  );
};

export default App;
