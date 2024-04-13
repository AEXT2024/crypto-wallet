const Wallet = artifacts.require("Wallet");

contract("Wallet", accounts => {
  it("should log gas used for a function call", async () => {
    let walletInstance = await Wallet.deployed();

    // Example of a function call
    let result = await walletInstance.someWalletFunction({from: accounts[0]});

    // Getting the transaction receipt to access gasUsed
    let tx = await web3.eth.getTransactionReceipt(result.tx);

    console.log("Gas used for someWalletFunction():", tx.gasUsed);
    
      });
});
