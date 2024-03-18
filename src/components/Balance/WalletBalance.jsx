// import React from 'react';
// import Web3 from 'web3';
// import contractABI from '../../contracts/wallet.json';

// const contractAddress = '0xA5Cc76EdabD9511a46708490Ef432E64746B89C9';

// const web3 = new Web3(window.ethereum);

// const myContract = new web3.eth.Contract(contractABI.abi, contractAddress);

// const WalletBalance = () => {
//   async function checkBalance() {
//     const balance = await myContract.methods.Check_Balance().call();
//     console.log(`Balance: ${balance}`);
//   }
//   return (
//     <section className="py-10 text-center">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//         Wallet Balance
//       </h2>
//       <button type="button" onClick={checkBalance} className="btn btn-primary">
//         Check Balance
//       </button>
//       <p id="balance">Balance: 0 ETH</p>
//     </section>
//   );
// };
// export default WalletBalance;

import React, { useEffect, useState } from 'react';

const WalletBalance = ({ web3, account }) => {
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    const loadBalance = async () => {
      const balanceWei = await web3.eth.getBalance(account);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
      setBalance(balanceEth);
    };

    if (web3 && account) {
      loadBalance();
    }
  }, [web3, account]);

  return (
    <div className="py-10 text-center">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Wallet Balance
      </h3>
      <p>{balance} ETH</p>
    </div>
  );
};

export default WalletBalance;
