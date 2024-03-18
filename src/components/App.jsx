import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletABI from '../contracts/wallet.json';

import WalletBalance from './Balance/WalletBalance';
import SendEther from './SendEther/SendEther';
import SendERC1155 from './SendERC1155/SendERC1155';
import ReceiveEther from './ReceiveEther/ReceiveEther';
import TransferERC20 from './TransferERC20/TransferERC20';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import NavBar from './NavBar/NavBar';
import Hero from './Hero/Hero';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const networkId = await web3.eth.net.getId();
          const deployedNetwork = WalletABI.networks[networkId];
          const contractInstance = new web3.eth.Contract(
            WalletABI.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);
        } catch (error) {
          console.error(
            'Failed to load web3, accounts, or contract. Check console for details.',
            error
          );
        }
      } else {
        window.alert(
          'Ethereum browser not detected. You should consider trying MetaMask!'
        );
      }
    };
    loadBlockchainData();
  }, []);

  return (
    <>
      <header className="w-full">
        <NavBar />
      </header>
      <main className="w-full shadow-lg rounded-lg p-4 mt-4">
        <Hero />
        {account && (
          <>
            <WalletBalance web3={web3} account={account} contract={contract} />
            <SendEther web3={web3} account={account} contract={contract} />
            <TransferERC20 web3={web3} account={account} contract={contract} />
            <SendERC1155 web3={web3} account={account} contract={contract} />
            <ReceiveEther account={account} />
            <TransactionHistory
              web3={web3}
              contract={contract}
              account={account}
            />
          </>
        )}
        {!account && <p>Please connect your Web3 wallet.</p>}
      </main>
      <footer></footer>
    </>
  );
};

export default App;
