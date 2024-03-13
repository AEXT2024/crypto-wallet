import React from 'react';
import Web3 from 'web3';
import contractABI from '../../contracts/wallet.json';

const contractAddress = '0xA5Cc76EdabD9511a46708490Ef432E64746B89C9';

const web3 = new Web3(window.ethereum);
// console.log(contractABI, 'contarctABI');
// console.log(contractABI.abi, 'contarctABI-abi');

const myContract = new web3.eth.Contract(contractABI.abi, contractAddress);

const WalletBalance = () => {
  async function checkBalance() {
    const balance = await myContract.methods.Check_Balance().call();
    console.log(`Balance: ${balance}`);
  }
  return (
    <section>
      <h2>Wallet Balance</h2>
      <button onClick={checkBalance}>Check Balance</button>
      <p id="balance">Balance: 0 ETH</p>
    </section>
  );
};
export default WalletBalance;
