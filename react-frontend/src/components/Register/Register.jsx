import React, { useContext } from "react";
import {Modal, Button, Form} from 'react-bootstrap'; 
import axios from 'axios';
import { AuthContext } from "../../App";

function Register(){
    async function registerCall() {
        let contractInstance = await contractCall();
        if (await contractInstance.isRegistered(addr1)) {
            document.querySelector(".regiErrPlaceholder").textContent = "You are already registered!"
        }
        else{
            await contractInstance.register({ value: 1000000000, gasLimit: 12000000 });
        }
    }
    return(
    <Modal>
        <Form onSubmit={registerCall}>
            <Button variant="primary" type="submit">
              Register
            </Button>
        </Form>
    </Modal>   
    );

}


export default Register;