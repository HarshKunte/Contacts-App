import React, { useEffect, useContext } from "react";

import { Container, ListGroup, ListGroupItem, Spinner, Jumbotron, Button } from "reactstrap";
import Contact from "../components/Contact";
import { MdAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { ContactContext } from "../context/Context";
import { CONTACT_TO_UPDATE, SET_CONTACT, SET_LOADING, SET_CURRENT_USER, SET_IS_LOGGEDIN } from "../context/action.types";

import { firebaseConfig } from '../utils/config'
import firebase from 'firebase/app'
import 'firebase/auth'
import { toast } from "react-toastify";


const app = firebase.initializeApp(firebaseConfig)

var provider = new firebase.auth.GoogleAuthProvider();


const Contacts = () => {
  const { state, dispatch } = useContext(ContactContext);

  // destructuring contacts and isLoading from state
  const { currentUser, contacts, isLoading, isLoggedIn } = state;

  // history hooks from react router dom to get history
  const history = useHistory();

  const getContacts = async () => {
    // TODO: load existing data
    if (firebase.auth().currentUser) {
      dispatch({
        type: SET_LOADING,
        payload: true
      })
      const userId = firebase.auth().currentUser.uid
      const contactsRef = await firebase.database().ref('/users/' + userId + '/contacts')
      contactsRef.on('value', snapshot => {
        dispatch({
          type: SET_CONTACT,
          payload: snapshot.val()
        })
        dispatch({
          type: SET_LOADING,
          payload: false
        })
      })
    }
    else {
      dispatch({
        type: SET_CONTACT,
        payload: []
      })
    }

  };

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log(user)
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      })
      getContacts()
      if (user) {
        try {
          firebase.database()
            .ref('users/' + user.uid + '/info')
            .set({
              name: user.displayName, email: user.email
            })
          dispatch({
            type: SET_IS_LOGGEDIN,
            payload: true
          })
          getContacts()
        } catch (error) {
          console.log(error)
        }
      }
      else {
        dispatch({
          type: SET_IS_LOGGEDIN,
          payload: false
        })

      }
    })
  }, [])


  // handle fab icon button click
  // will set in state of the contact to update and send it to the contact/add route
  const AddContact = () => {
    //TODO: use dispatch to send user to add contact screen
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: null,
      key: null
    })
    history.push("/contact/add");
  };

  const authWithGoogle = () => {
    firebase.auth().signInWithPopup(provider)
  }

  // return loading spinner
  if (isLoading) {
    return (
      <div className="Center">
        <Spinner color="primary" />
        <div className="text-primary">Loading...</div>
      </div>
    );
  }



  return (
    <Container className="mt-4 mb-10">
      {
        isLoggedIn ? (
          <Jumbotron style={{ backgroundColor: 'white' }} >
            <h1 className='ml-10 font-weight-bold text-md-left text-center' style={{ fontSize: '4rem' }}>People.</h1>
            <p className='text-secondary text-md-left text-center' >Contacts app using React js and Firebase</p>
            <p className='text-primary text-md-left text-center' >Click on '+' icon to add new contact.</p>
          </Jumbotron>
        ) : (

            <Container style={{ backgroundColor: 'white' }}  >
              <h1 className='ml-10 font-weight-bold text-md-left text-center' style={{ fontSize: '4rem' }}>People.</h1>
              <p className='text-secondary text-md-left text-center' >Contacts app using React js and Firebase</p><br />
              <p className=' text-md-left text-center' >Please Login to continue!</p>
              <Button color='primary' outline onClick={authWithGoogle} style={{ marginLeft: '50%', transform: 'translateX(-50%)', marginTop: '100px' }}>

                Login/Register with Google</Button>
            </Container>

          )
      }
      {
        contacts.length === 0 && !isLoading && isLoggedIn ? (
          <div className="Center text-large text-primary">NO Contacts found</div>
        ) : (
            <ListGroup>
              {Object.entries(contacts).map(([key, value]) => (
                <ListGroupItem key={key}>
                  <Contact contact={value} contactKey={key} />
                </ListGroupItem>
              ))}
            </ListGroup>
          )
      }
      {/* TODO:DONE Loop through FIREBASE objects  */}
      <MdAdd className="fab icon" title='Add Contact' onClick={AddContact} style={{ cursor: 'pointer' }} />
    </Container>
  );
};

export default Contacts;
