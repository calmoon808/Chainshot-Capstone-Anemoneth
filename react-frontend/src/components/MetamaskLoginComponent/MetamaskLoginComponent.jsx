import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./MetamaskLoginComponent.scss";
import { AuthContext } from "../../App";
import MetaMaskOnboarding from '@metamask/onboarding'
const onboarding = new MetaMaskOnboarding({});

function LoginRegister() {
    const [connectButtonText, setConnectButtonText] = useState("");
    const [connectButtonFunc, setConnectButtonFunc] = useState(null);
    const [disableButton, setDisableButton] = useState("false");

    const context = useContext(AuthContext);
    const setUserWalletAddress = context[1];

    useEffect(() => {
        const { ethereum } = window;
        const isMetaMaskInstalled = () => {
            //Have to check the ethereum binding on the window object to see if it's installed
            return Boolean(ethereum && ethereum.isMetaMask);
        }

        const onClickConnect = async () => {
            try {
                // Will open the MetaMask UI
                setDisableButton("true");
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                setDisableButton("false");
                localStorage.setItem("address", accounts[0]); //
                if (accounts.length > 0) {
                    setUserWalletAddress(accounts[0]); 
                    window.location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        }

        const MetaMaskClientCheck = () => {
            if (!isMetaMaskInstalled()) {
                setConnectButtonText("Click here to install MetaMask!");
                setConnectButtonFunc(() => onboarding.startOnboarding);
            } else {
                setConnectButtonText("Login with MetaMask");
                setConnectButtonFunc(() => onClickConnect);
            }
        }
        MetaMaskClientCheck();
    }, [setUserWalletAddress])

    return (
        <div id="LoginRegisterComponent">
            <Button 
                id="metamaskConnectButton" 
                className="loginButtons" 
                disable={disableButton} 
                onClick={connectButtonFunc}
            >
                {connectButtonText}
            </Button>
        </div>
    )
}

export default LoginRegister;
