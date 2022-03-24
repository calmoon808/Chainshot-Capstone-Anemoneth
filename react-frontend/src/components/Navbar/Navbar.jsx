import React, { useState, useContext } from 'react'
import {Button, Form} from 'react-bootstrap';
import UserNameInfo from "../UserNameInfo/UserNameInfo";
import AddPostComponent from '../AddPostComponent/AddPostComponent';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injected, walletconnect, resetWalletConnector, walletlink } from '../../utils/connectors';
import { getContract } from '../../utils/contract';

import { ethers } from 'ethers';

function Navbar() {
  const context = useContext(AuthContext);
  const [userWalletAddress] = context;
  const [usernameModalShow, setUsernameModalShow] = useState(false);
  const [addPostModalShow, setAddPostModalShow] = useState(false);
  //const contractAddr = "0xDAF4a09A7184Ba13E8e28Ea6a2CEfd8995887451";
  //connector, library, chainId, account, activate, deactivate
	const web3reactContext = useWeb3React(); 
  // async function connect() {
  //   await window.ethereum.enable()
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner(0);
  //   const contract = await new ethers.Contract(contractAddr, abi.abi, signer);

  //   const address = await signer.getAddress();
  //   const balance = await provider.getBalance(userWalletAddress);
  //   // const count = await contract.register();
  //   console.log({address,balance,contract});
  // }

  // connect();
  const getLibrary = (provider) => {
		const library = new Web3Provider(provider, 'any');
		library.pollingInterval = 15000;
		return library;
	};
  //web3react metamask
	const connectMetamaskSimple = async () => {
    
		try {
			await web3reactContext.activate(injected);
		} catch (ex) {
			console.log(ex);
		}
	};
  
 
  return (
    <div className='navBar'>
      <img src="/assets/logo.png" alt="" />
      <div className="appName">
        <h1>Decentralized Social</h1>
      </div>
      <div className='buttonContainer'>
        <Button className="buttons" variant="primary" onClick={() => setUsernameModalShow(true)}>
          Change username
        </Button>
        <UserNameInfo
          show={usernameModalShow}
          onHide={() => setUsernameModalShow(false)}
        />
        <Button className="buttons" variant="primary" onClick={() => setAddPostModalShow(true)}>
          Make a Post
        </Button>
        <AddPostComponent
          userwalletaddress={userWalletAddress}
          show={addPostModalShow}
          onHide={() => setAddPostModalShow(false)}
        />
        <Web3ReactProvider getLibrary={getLibrary}>
				<button
					className=""
					onClick={connectMetamaskSimple}
				>
					Connect Metamask
				</button>
        </Web3ReactProvider>
			  
        
      </div>
    </div>
  )
}

export default Navbar