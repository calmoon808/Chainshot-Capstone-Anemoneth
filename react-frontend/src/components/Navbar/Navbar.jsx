import React, { useState, useContext } from 'react'
import {Button} from 'react-bootstrap';
import UserNameInfo from "../UserNameInfo/UserNameInfo";
import AddPostComponent from '../AddPostComponent/AddPostComponent';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss'

function Navbar() {
  const context = useContext(AuthContext);
  const [userWalletAddress, setUserWalletAddress] = context;
  const [usernameModalShow, setUsernameModalShow] = useState(false);
  const [addPostModalShow, setAddPostModalShow] = useState(false);

  return (
    <div>
      <h1>NAME OF SOCIAL NETWORK</h1>
      <Button variant="primary" onClick={() => setUsernameModalShow(true)}>
        Change username
      </Button>
      <UserNameInfo
        show={usernameModalShow}
        onHide={() => setUsernameModalShow(false)}
      />
      <Button variant="primary" onClick={() => setAddPostModalShow(true)}>
        Make a Post
      </Button>
      <AddPostComponent
        userwalletaddress={userWalletAddress}
        show={addPostModalShow}
        onHide={() => setAddPostModalShow(false)}
      />
    </div>
  )
}

export default Navbar