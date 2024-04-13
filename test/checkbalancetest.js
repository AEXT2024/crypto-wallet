const Wallet = artifacts.require("Wallet");

contract("Wallet", (accounts) => {
  const [deployer, user] = accounts;

  it("should accurately report the contract's Ether balance", async () => {
    const wallet = await Wallet.deployed();
    
    // Send Ether to the wallet contract
    const sendAmount = web3.utils.toWei("1", "ether");
    await web3.eth.sendTransaction({ from: user, to: wallet.address, value: sendAmount });

    // Check balance using the Check_Balance function
    const initialBalance = await wallet.Check_Balance();
    assert.equal(initialBalance.toString(), sendAmount, "The reported balance does not match the sent amount");

    // Withdraw half of the Ether and check balance again
    const withdrawAmount = web3.utils.toWei("0.5", "ether");
    await wallet.Withdraw_Ether(user, withdrawAmount, { from: deployer });

    const finalBalance = await wallet.Check_Balance();
    const expectedFinalBalance = web3.utils.toBN(sendAmount).sub(web3.utils.toBN(withdrawAmount)).toString();
    assert.equal(finalBalance.toString(), expectedFinalBalance, "The balance after withdrawal is incorrect");
  });
});
