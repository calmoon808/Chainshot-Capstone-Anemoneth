import React, { useState, useEffect } from 'react'
import {Button} from 'react-bootstrap';
import UserNameInfo from "../UserNameInfo/UserNameInfo";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss'

function Navbar() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
        <h1>THIS BE THE NAVBAR</h1>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Change username
        </Button>
        <UserNameInfo
          show={modalShow}
          onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default Navbar