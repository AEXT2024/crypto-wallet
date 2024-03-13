import React from 'react';

const TransferERC20 = () => {
  const transferERC20 = () => {
    console.log('Transferring ERC-20 tokens...');
  };
  return (
    <section className="max-w-4xl mx-auto py-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Transfer ERC-20 Tokens
      </h2>
      <form className="space-y-4">
        <label
          htmlFor="erc20Address"
          className="block text-md font-medium text-gray-700"
        >
          Token Contract Address:
        </label>
        <input
          type="text"
          id="erc20Address"
          placeholder="0x..."
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="erc20To"
          className="block text-md font-medium text-gray-700"
        >
          Address to Send Tokens:
        </label>
        <input
          type="text"
          id="erc20To"
          placeholder="0x..."
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <label
          htmlFor="erc20Amount"
          className="block text-md font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          id="erc20Amount"
          placeholder="Amount"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        <button
          type="button"
          onClick={transferERC20}
          className="w-full px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Transfer ERC-20 Tokens
        </button>
      </form>
    </section>
  );
};

export default TransferERC20;
