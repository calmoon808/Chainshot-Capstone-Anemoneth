import React from 'react'
import './LoginPage.scss';
import MetamaskLoginComponent from '../MetamaskLoginComponent/MetamaskLoginComponent'

function LoginPage() {
  return (
    <div className='loginpage'>
      <div className='loginPiecesContainer'>
        <div id="title" className='loginPieces'>
          <img src="/assets/logo.png" alt="" />
          <h1>Decentralized Social</h1>
          <h4>Connect with friends and the decentralised world around you</h4>
          <MetamaskLoginComponent/>
        </div>
      </div>
    </div>
  )
}

export default LoginPage