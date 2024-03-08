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
  return (
    <div className="metamask_connection" style={{ marginBottom: '200px' }}>
      {userAccount ? (
        <div className="user_info">
          <span></span>Your account: {userAccount}
          <span>Your balance: {balance} ETH</span>
        </div>
      ) : (
        <>
          <h2>Connect your wallet to Metamask</h2>
          <button type="button" onClick={onConnect}>
            Connect your wallet
          </button>
        </>
      )}
    </div>
  );
};

export default MetamaskConnection;
