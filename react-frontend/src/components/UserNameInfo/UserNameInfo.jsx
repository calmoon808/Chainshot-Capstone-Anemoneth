import React, { Component, useState, useContext, useEffect } from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'; 
import axios from 'axios';
import { AuthContext } from "../../App";
import 'bootstrap/dist/css/bootstrap.min.css';


function UserNameInfo(props) {

    const context = useContext(AuthContext);
    const [userWalletAddress, setUserWalletAddress] = context;

    const hangelUsernameSubmit = (e) => {
        e.preventDefault();
        const userName = e.target.elements[0].value;
        console.log(userName);
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
                <div className="container">
                    <form id="userNameForm" onSubmit={hangelUsernameSubmit}>
                    <label>
                    Change Username:
                    <input type="text" />
                    </label>
                    
                    </form>
                </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button form="userNameForm" type="submit">Submit</Button>
            </Modal.Footer>
          </Modal>
        );
    }


export default UserNameInfo;