import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export function getProvider(provider) {
  const web3Provider = new Web3Provider(provider);
  web3Provider.pollingInterval = 1000;
  return web3Provider;
}
  
ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProvider}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
