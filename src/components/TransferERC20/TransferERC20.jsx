import React from 'react';

const TransferERC20 = () => {
  const transferERC20 = () => {
    console.log('Transferring ERC-20 tokens...');
  };
  return (
    <div className="section">
      <h2>Transfer ERC-20 Tokens</h2>
      <form>
        <label htmlFor="erc20Address">Token Contract Address:</label>
        <input type="text" id="erc20Address" placeholder="0x..." />
        <label htmlFor="erc20To">Address to Send Tokens:</label>
        <input type="text" id="erc20To" placeholder="0x..." />
        <label htmlFor="erc20Amount">Amount:</label>
        <input type="number" id="erc20Amount" placeholder="Amount" />
        <button type="button" onClick={transferERC20}>
          Transfer ERC-20 Tokens
        </button>
      </form>
    </div>
  );
};

export default TransferERC20;
