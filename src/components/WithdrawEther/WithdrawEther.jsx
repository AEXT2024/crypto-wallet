import React from 'react';

const WithdrawEther = () => {
  const withdrawEther = () => {
    console.log('Withdraw Ether...');
  };
  return (
    <section className="max-w-4xl mx-auto py-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Withdraw Ether
      </h2>
      <form className="space-y-4">
        <label
          htmlFor="withdrawTo"
          className="block text-md font-medium text-gray-700"
        >
          Address to Send Ether:
        </label>
        <input
          type="text"
          id="withdrawTo"
          placeholder="0x..."
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="withdrawAmount"
          className="block text-md font-medium text-gray-700"
        >
          Amount (in ETH):
        </label>
        <input
          type="number"
          id="withdrawAmount"
          placeholder="Amount in ETH"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <button
          className="w-full px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={withdrawEther}
        >
          Withdraw Ether
        </button>
      </form>
    </section>
  );
};

export default WithdrawEther;
