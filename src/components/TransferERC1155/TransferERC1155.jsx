import React from 'react';

const TransferERC1155 = () => {
  const transferERC1155 = () => {
    console.log('Transferring ERC-1155 tokens...');
  };
  return (
    <div className="section">
      <h2>Transfer ERC-1155 Tokens</h2>
      <form>
        <label htmlFor="erc1155Address">Token Contract Address:</label>
        <input type="text" id="erc1155Address" placeholder="0x..." />
        <label htmlFor="erc1155To">Address to Send Tokens:</label>
        <input type="text" id="erc1155To" placeholder="0x..." />
        <label htmlFor="erc1155Id">Token ID:</label>
        <input type="number" id="erc1155Id" placeholder="Token ID" />
        <label htmlFor="erc1155Amount">Amount:</label>
        <input type="number" id="erc1155Amount" placeholder="Amount" />
        <button onClick={transferERC1155}>Transfer ERC-1155 Tokens</button>
      </form>
    </div>
  );
};

export default TransferERC1155;
