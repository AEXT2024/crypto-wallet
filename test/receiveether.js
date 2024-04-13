const Wallet = artifacts.require("Wallet");

contract("Wallet", (accounts) => {
  let wallet;  

  before(async () => {
    wallet = await Wallet.deployed();  
  });

  it("should receive Ether", async () => {
    const sender = accounts[0];  // Use the first account as sender
    const sendAmount = web3.utils.toWei("1", "Ether");

    // Capture the initial balance of the wallet
    const initialBalance = await web3.eth.getBalance(wallet.address);

    // Send Ether to the wallet contract
    await web3.eth.sendTransaction({ from: sender, to: wallet.address, value: sendAmount });

    // Capture the final balance of the wallet
    const finalBalance = await web3.eth.getBalance(wallet.address);

    // Calculate the expected final balance
    const expectedFinalBalance = BigInt(initialBalance) + BigInt(sendAmount);

    // Assert the final balance is as expected
    assert.equal(finalBalance.toString(), expectedFinalBalance.toString(), "The wallet did not receive the correct amount of Ether");
  });

  it("should correctly accumulate Ether from multiple transactions", async () => {
    // Using different accounts for multiple transactions
    await Promise.all([
      web3.eth.sendTransaction({ from: accounts[1], to: wallet.address, value: web3.utils.toWei("1", "Ether") }),
      web3.eth.sendTransaction({ from: accounts[2], to: wallet.address, value: web3.utils.toWei("2", "Ether") })
    ]);

    const finalBalance = await web3.eth.getBalance(wallet.address);
    const expectedBalance = BigInt(web3.utils.toWei("3", "Ether"));  // Total of 1 + 2 Ether
    assert.equal(finalBalance.toString(), expectedBalance.toString(), "The wallet did not correctly accumulate Ether from multiple sources");
  });
});
