import React, { useState, useContext } from 'react'
import {Button} from 'react-bootstrap';
import UserNameInfo from "../UserNameInfo/UserNameInfo";
import AddPostComponent from '../AddPostComponent/AddPostComponent';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss'

function Navbar() {
  const context = useContext(AuthContext);
  const [userWalletAddress] = context;
  const [usernameModalShow, setUsernameModalShow] = useState(false);
  const [addPostModalShow, setAddPostModalShow] = useState(false);
  
 
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
      </div>
    </div>
  )
}

export default Navbar