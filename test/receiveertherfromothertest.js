const Wallet = artifacts.require("Wallet");

contract("Wallet", (accounts) => {
  it("should correctly accumulate Ether from multiple transactions", async () => {
    const wallet = await Wallet.deployed();
    const sendAmount1 = web3.utils.toWei("1", "Ether");
    const sendAmount2 = web3.utils.toWei("2", "Ether");

    // Send Ether to the wallet
    await web3.eth.sendTransaction({ from: accounts[0], to: wallet.address, value: sendAmount1 });
    await web3.eth.sendTransaction({ from: accounts[1], to: wallet.address, value: sendAmount2 });

    // Check final balance
    const finalBalance = await web3.eth.getBalance(wallet.address);
    const expectedFinalBalance = BigInt(sendAmount1) + BigInt(sendAmount2);

    assert.equal(finalBalance.toString(), expectedFinalBalance.toString(), "The wallet did not accumulate Ether correctly from multiple transactions");
  });
});
