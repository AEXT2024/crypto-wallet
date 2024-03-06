import React from 'react';

const WithdrawEther = () => {

    const withdrawEther = () => {
        console.log('Withdraw Ether...');
    }
  return (
    <div className="section">
      <h2>Withdraw Ether</h2>
      <form>
        <label htmlFor="withdrawTo">Address to Send Ether:</label>
        <input type="text" id="withdrawTo" placeholder="0x..." />
        <label htmlFor="withdrawAmount">Amount (in ETH):</label>
        <input type="number" id="withdrawAmount" placeholder="Amount in ETH" />
        <button onClick={withdrawEther}>Withdraw Ether</button>
      </form>
    </div>
  );
};

export default WithdrawEther;
