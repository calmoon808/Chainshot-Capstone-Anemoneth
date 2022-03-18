import React, { useState } from 'react'
import './LoginPage.scss';
// import { ethers } from 'ethers';
// import anemonethJSON from '../../utils/anemoneth.json'
// import { AuthContext } from "../../App";
import LoginRegisterComponent from '../LoginRegisterComponent/LoginRegister'

function LoginPage() {
  // const [userAccount, setUserAccount] = useState("");
  // const [userBalance, setUserBalance] = useState("");
  
  // DELETE THIS FUNCTION
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='loginpage'>
      <div className='loginPiecesContainer'>
        <div id="title" className='loginPieces'>
          <h1>Anemoneth</h1>
          <h4>Connect with friends and the decentralised world around you on Anemoneth</h4>
        </div>
        {/**DELETE THIS BUTTON */}
        <button onClick={handleClick}>test</button>
        <div className='loginPieces'>
          <LoginRegisterComponent/>
        </div>
      </div>
    </div>
  )
}

export default LoginPage