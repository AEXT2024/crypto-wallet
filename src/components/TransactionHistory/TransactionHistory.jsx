import React, { useState, useEffect } from 'react';

const TransactionHistory = ({ web3, contract, account }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (web3 && contract && account) {
      // Example: Fetch 'Transfer' events emitted by the contract
      // Adjust for the actual events your contract emits
      contract
        .getPastEvents('Transfer', {
          filter: { from: account }, // You can specify filters, {from: account}, {to: account}
          fromBlock: 0,
          toBlock: 'latest',
        })
        .then(events => {
          setEvents(events);
        })
        .catch(console.error);
    }
  }, [web3, contract, account]);

  if (!events.length) return <p>No transaction history found.</p>;

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            From: {event.returnValues.from} - To: {event.returnValues.to} -
            Value: {event.returnValues.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
