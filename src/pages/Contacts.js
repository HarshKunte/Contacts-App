import React, { useContext } from "react";

import { Container, ListGroup, ListGroupItem, Spinner, Jumbotron } from "reactstrap";
import Contact from "../components/Contact";
import { MdAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { ContactContext } from "../context/Context";
import { CONTACT_TO_UPDATE } from "../context/action.types";

const Contacts = () => {
  const { state, dispatch } = useContext(ContactContext);

  // destructuring contacts and isLoading from state
  const { contacts, isLoading } = state;

  // history hooks from react router dom to get history
  const history = useHistory();

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
    <Container className="mt-4">
      <Jumbotron style={{ backgroundColor: 'white' }} >
        <h1 className='ml-10 font-weight-bold text-md-left text-center' style={{ fontSize: '4rem' }}>People.</h1>
        <p className='text-secondary text-md-left text-center' >Contacts app using React js and Firebase</p>
        <p className='text-primary text-md-left text-center' >Click on '+' icon to add new contact.</p>
      </Jumbotron>
      {/* TODO:DONE Loop through FIREBASE objects  */}
      {contacts.length === 0 && !isLoading ? (
        <div className="Center text-large text-primary">NO Contacts found</div>
      ) : (
          <ListGroup>
            {Object.entries(contacts).map(([key, value]) => (
              <ListGroupItem key={key}>
                <Contact contact={value} contactKey={key} />
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      <MdAdd className="fab icon" title='Add Contact' onClick={AddContact} />
    </Container>
  );
};

export default Contacts;
