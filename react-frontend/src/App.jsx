import './App.scss';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Homepage from './components/Homepage/Homepage';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';


export const AuthContext = createContext();

export function getLibrary(provider, connector) {
  return new Web3Provider(provider);
}

function App() {
  const [userWalletAddress, setUserWalletAddress] = useState(localStorage.getItem("address"));

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(`address changed! ${accounts[0]}`);
        localStorage.setItem("address", accounts[0]);
      })
    }
  });

  return (
    <>
      <AuthContext.Provider value={[userWalletAddress, setUserWalletAddress]}>
        <Router>
          <Routes>
            <Route path="/" element = { (userWalletAddress !== "null") && (userWalletAddress !== null) ? 
              <Web3ReactProvider getLibrary={getLibrary}>
                <Homepage />
              </Web3ReactProvider> : 
              <LoginPage /> }
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;