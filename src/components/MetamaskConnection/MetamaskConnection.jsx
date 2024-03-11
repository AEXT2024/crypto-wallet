import React, { useState } from 'react';
import { ethers } from 'ethers';

const MetamaskConnection = () => {
  const [userAccount, setUserAccount] = useState(null);
  const [balance, setBalance] = useState('0');

  const onConnect = () => {
    if (window.ethereum) {
      // If user has Metamask
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(account => {
          setUserAccount(account[0]);
          getBalance(account[0]);
        });
      window.ethereum.on('accountChanged', onConnect);
      window.ethereum.on('chainChanged', chainChangedHandler);
    } else {
      alert('Please install Metamask');
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

  return (
    <div className="hero-content text-center">
      {userAccount && balance ? (
        <div className="user_info">
          <span></span>Your account: {userAccount}
          <span>Your balance: {balance} ETH</span>
        </div>
      ) : (
        <div className="max-w-md">
          <h2 className="text-5xl font-bold py-6">
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
