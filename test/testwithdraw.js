const Wallet = artifacts.require("Wallet");
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("Wallet", (accounts) => {
    const [owner, recipient, nonOwner] = accounts;
    let wallet;

    beforeEach(async () => {
        wallet = await Wallet.new({from: owner});
        // Send Ether to the wallet contract for testing
        await web3.eth.sendTransaction({ from: owner, to: wallet.address, value: web3.utils.toWei("1", "ether") });
    });

    it("should allow the owner to withdraw Ether", async () => {
        const initialBalance = await web3.eth.getBalance(recipient);
        const amount = web3.utils.toWei("0.5", "ether");

        await wallet.Withdraw_Ether(recipient, amount, { from: owner });

        const finalBalance = await web3.eth.getBalance(recipient);
        const balanceDifference = web3.utils.toBN(finalBalance).sub(web3.utils.toBN(initialBalance));

        assert(balanceDifference.toString() === amount, "The recipient did not receive the correct amount");
    });

    it("should fail if the withdrawal amount is more than the contract balance", async () => {
        const amount = web3.utils.toWei("2", "ether"); // More than the contract has
        await expectRevert(
            wallet.Withdraw_Ether(recipient, amount, { from: owner }),
            "Insufficient balance"
        );
    });

    it("should only allow the owner to withdraw Ether", async () => {
        const amount = web3.utils.toWei("0.1", "ether");
        await expectRevert(
            wallet.Withdraw_Ether(recipient, amount, { from: nonOwner }),
            "Ownable: caller is not the owner"
        );
    });

    it("should emit an EtherSent event on successful withdrawal", async () => {
        const amount = web3.utils.toWei("0.1", "ether");
        const receipt = await wallet.Withdraw_Ether(recipient, amount, { from: owner });

        assert(receipt.logs.length > 0, "No events were triggered");
        assert(receipt.logs[0].event === "EtherSent", "The EtherSent event was not triggered");
    });
});
