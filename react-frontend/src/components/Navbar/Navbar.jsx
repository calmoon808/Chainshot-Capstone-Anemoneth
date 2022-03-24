import React, { useState, useContext } from 'react'
import {Button, Form} from 'react-bootstrap';
import UserNameInfo from "../UserNameInfo/UserNameInfo";
import AddPostComponent from '../AddPostComponent/AddPostComponent';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss'
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../utils/connectors';
import { getContract } from '../../utils/contract';

function Navbar() {
  const context = useContext(AuthContext);
  const [userWalletAddress] = context;
  const [usernameModalShow, setUsernameModalShow] = useState(false);
  const [addPostModalShow, setAddPostModalShow] = useState(false);
	const web3reactContext = useWeb3React(); 
  const { ethereum } = window;
  console.log(web3reactContext);
  //web3react metamask   
	const connectMetamaskSimple = async () => {
    // const smartContractInstance = await getContract(ethereum);
		try {
			await web3reactContext.activate(injected);
      //await smartContractInstance.register({ value: 1000000000});

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
        
				<Button
					className="buttons" variant="primary"
					onClick={connectMetamaskSimple}
				>
					Register
        </Button>
        
      </div>
    </div>
  )
}

export default Navbar