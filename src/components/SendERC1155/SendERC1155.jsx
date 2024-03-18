import React, { useState } from 'react';
import Web3 from 'web3';
import WalletABI from '../../contracts/wallet.json';

const SendERC1155 = ({ account }) => {
 const [recipient, setRecipient] = useState('');
 const [tokenId, setTokenId] = useState('');
 const [amount, setAmount] = useState('');
 const [contractAddress, setContractAddress] = useState('');

 const web3 = new Web3(Web3.givenProvider);
 const tokenContract = new web3.eth.Contract(WalletABI.abi, contractAddress);

 const handleSubmit = async e => {
   e.preventDefault();

   try {
     // Adjust the method signature if your contract differs from the standard
     await tokenContract.methods
       .safeTransferFrom(account, recipient, tokenId, amount, '0x0')
       .send({ from: account });
     alert('ERC-1155 token sent successfully!');
   } catch (error) {
     alert(`Failed to send ERC-1155 token: ${error.message}`);
   }
 };
  return (
    <section className="max-w-4xl mx-auto py-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Send ERC-1155 Token
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label
          htmlFor="erc1155Address"
          className="block text-md font-medium text-gray-700"
        >
          Contract Address:
        </label>
        <input
          type="text"
          value={contractAddress}
          onChange={e => setContractAddress(e.target.value)}
          id="erc1155Address"
          placeholder="0x..."
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="erc1155To"
          className="block text-md font-medium text-gray-700"
        >
          Recipient Address:
        </label>
        <input
          type="text"
          id="erc1155To"
          placeholder="0x..."
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="erc1155Id"
          className="block text-md font-medium text-gray-700"
        >
          Token ID:
        </label>
        <input
          type="number"
          id="erc1155Id"
          value={tokenId}
          onChange={e => setTokenId(e.target.value)}
          placeholder="Token ID"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="erc1155Amount"
          className="block text-md font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          id="erc1155Amount"
          placeholder="Amount"
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

export default SendERC1155;
