import React, { useContext } from "react";
import {Modal, Button, Form} from 'react-bootstrap'; 
import contractCall from "../ContractCall/ContractCall";
import { AuthContext } from "../../App";

function Register(props){
    const context = useContext(AuthContext);
    const [userWalletAddress] = context;
    async function registerCall() {
        console.log("test");
        let contractInstance = await contractCall();
        if (await contractInstance.isRegistered()) {
            document.querySelector(".regiErrPlaceholder").textContent = "You are already registered!"
        }
        else{
            await contractInstance.register({ value: 1000000000, gasLimit: 12000000 });
        }
    }
    return(
    <Modal>
        <Form id="register" onSubmit={registerCall}>
            <Button variant="primary" type="submit">
              Register
            </Button>
        </Form>
    </Modal>   
    );

}


export default Register;