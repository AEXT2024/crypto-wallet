import React, { useState } from 'react';

const SendEther = ({ web3, account }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: web3.utils.toWei(amount, 'ether'),
      });
      alert('Ether sent successfully!');
    } catch (error) {
      alert(`Failed to send Ether: ${error.message}`);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Ether</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label
          htmlFor="sendTo"
          className="block text-md font-medium text-gray-700"
        >
          Recipient Address:
        </label>
        <input
          type="text"
          id="sendTo"
          placeholder="0x..."
          onChange={e => setRecipient(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="withdrawAmount"
          className="block text-md font-medium text-gray-700"
        >
          Amount (in ETH):
        </label>
        <input
          type="text"
          id="withdrawAmount"
          value={amount}
          placeholder="Amount in ETH"
          onChange={e => setAmount(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <button
          className="w-full px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type='submit'
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default SendEther;
