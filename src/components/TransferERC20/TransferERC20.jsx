import React, { useState } from 'react';
import Web3 from 'web3';
import WalletABI from '../../contracts/wallet.json';

const TransferERC20 = ({ account }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [contractAddress, setContractAddress] = useState(''); // Users will input the ERC-20 token's contract address here

  const web3 = new Web3(Web3.givenProvider);

  const handleSubmit = async e => {
    e.preventDefault();

    // Initialize the contract instance with the user-provided contract address and Wallet ABI
    const tokenContract = new web3.eth.Contract(WalletABI.abi, contractAddress);

    // Convert the amount to the correct unit based on the token's decimals
    // Here we assume the token uses 18 decimals, as is standard for many ERC-20 tokens
    // Adjust accordingly if your token uses a different decimal setting
    const amountToSend = web3.utils.toWei(amount, 'ether');

    try {
      // Call the `transfer` function of the ERC-20 token contract
      await tokenContract.methods
        .transfer(recipient, amountToSend)
        .send({ from: account });
      alert('Token transfer successful!');
    } catch (error) {
      console.error('Token transfer failed:', error);
      alert(`Token transfer failed: ${error.message}`);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Send ERC-20 Token
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label
          htmlFor="erc20Address"
          className="block text-md font-medium text-gray-700"
        >
          Recipient Address:
        </label>
        <input
          type="text"
          id="erc20Address"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="0x..."
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="erc20Amount"
          className="block text-md font-medium text-gray-700"
        >
          Amount of Tokens:
        </label>
        <input
          type="text"
          id="erc20Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="erc20To"
          className="block text-md font-medium text-gray-700"
        >
          Token Contract Address:
        </label>
        <input
          type="text"
          value={contractAddress}
          onChange={e => setContractAddress(e.target.value)}
          id="erc20To"
          placeholder="0x..."
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />

        <button
          type="submit"
          className="w-full px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Tokens
        </button>
      </form>
    </section>
  );
};

export default TransferERC20;
