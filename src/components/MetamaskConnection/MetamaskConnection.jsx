import React, { useState } from 'react';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import metamask from '../../images/metamaskfox.png';

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
    <div className=" text-center">
      {userAccount && balance ? (
        <div className="text-lg mt-4">
          <span className=" text-blue-500">
            Your account:
            {userAccount}
          </span>
          <span className=" text-green-500">Your balance: {balance} ETH</span>
        </div>
      ) : (
        <div className="">
          <h2 className="text-3xl  py-6">
            Please connect your wallet to Metamask
          </h2>
          <button type="button" onClick={onConnect} className="btn btn-primary">
            Connect to <img alt="" src={metamask} width="50" height="50" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MetamaskConnection;
