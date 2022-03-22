import React, { useContext } from "react";
import {Modal, Button, Form} from 'react-bootstrap'; 
import axios from 'axios';
import { AuthContext } from "../../App";

function UserNameInfo(props) {

    const context = useContext(AuthContext);
    const [userWalletAddress, setUserWalletAddress] = context;

    const handleUsernameSubmit = (e) => {
      const userName = e.target.elements[0].value;
      axios.post("/userName", { userName, userWalletAddress })
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
    
    return( 
      <Modal 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Username
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUsernameSubmit}>
            <Form.Group className="mb-3" controlId="userNameForm">
              <Form.Label>Change Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      <Modal.Footer>
        <Button form="userNameForm" type="submit">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default UserNameInfo;