import React, { useState } from 'react';
import { ethers } from 'ethers';
import './MetamaskConection.css';
import Swal from 'sweetalert2';

const MetamaskConnection = () => {
  const [userAccount, setUserAccount] = useState(null);
  const [balance, setBalance] = useState('0');

  const onConnect = async () => {
    try {
      if (window.ethereum) {
        // If user has Metamask
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        if (accounts && accounts.length > 0) {
          setUserAccount(accounts[0]);
          getBalance(accounts[0]);
        }
        window.ethereum.on('accountChanged', onConnect);
        window.ethereum.on('chainChanged', chainChangedHandler);
      } else {
        showMetaMaskInstallAlert();
      }
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
      showMetaMaskErrorAlert(error);
    }
  };

  const getBalance = account => {
    window.ethereum
      .request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      })
      .then(balanceInWei => {
        const balanceInEther = ethers.formatEther(balanceInWei);
        setBalance(balanceInEther);
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };
  const showMetaMaskInstallAlert = () => {
    Swal.fire({
      title: 'Install METAMASK',
      text: 'To use this application, you need to install METAMASK.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Install MetaMask',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        // Redirecting user to the MetaMask installation
        window.open('https://metamask.io/download.html', '_blank');
      }
    });
  };

  const showMetaMaskErrorAlert = error => {
    Swal.fire({
      title: 'Error Connecting to MetaMask',
      text: `An error occurred while connecting to MetaMask: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="hero-content text-center">
      {userAccount && balance ? (
        <div className="user_info text-lg mt-4">
          <span className="account-info text-blue-500"></span>Your account:{' '}
          {userAccount}
          <span className="balance-info text-green-500">
            Your balance: {balance} ETH
          </span>
        </div>
      ) : (
        <div className="max-w-md">
          <h2 className="text-3xl font-bold py-6">
            Connect your wallet to Metamask
          </h2>
          <button type="button" onClick={onConnect} className="btn btn-primary">
            Connect your wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default MetamaskConnection;
