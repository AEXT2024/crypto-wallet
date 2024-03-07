import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './index.css';
// import Web3 from 'web3';

if (window.ethereum) {
  console.log('Ethereum provider detected');
  // const web3 = new Web3(window.ethereum);
  window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(() => {
      console.log('Ethereum enabled');
      // Ethereum and accounts are now accessible
      startApp();
    })
    .catch(error => {
      console.error('User denied account access', error);
      // Handle the case where the user denied access
    });
} else {
  console.warn('Non-Ethereum browser detected. Consider installing MetaMask.');
}

function startApp() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
