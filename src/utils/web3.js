import Web3 from 'web3';

if (window.ethereum) {
  const web3 = new Web3(window.ethereum);
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
  } catch (error) {
    console.error("User denied account access");
  }
} else {
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}
