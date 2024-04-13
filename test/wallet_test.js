const { expectRevert } = require('@openzeppelin/test-helpers'); // Import OpenZeppelin Test Helpers
const Wallet = artifacts.require("Wallet");
const MockERC20 = artifacts.require("MockERC20");

contract("Wallet - ERC20 Token Transfer", ([deployer, recipient, nonOwner]) => {
    let wallet;
    let token;

    beforeEach(async () => {
        wallet = await Wallet.new({ from: deployer });
        console.log(`Wallet deployed to: ${wallet.address}`); // Confirm wallet deployment

        token = await MockERC20.new("MockToken", "MTK", web3.utils.toWei('1000', 'ether'), { from: deployer });
        console.log(`Token deployed to: ${token.address}`); // Confirm token deployment

        await token.transfer(wallet.address, web3.utils.toWei('500', 'ether'), { from: deployer });
    });

    it("should allow the wallet to send ERC-20 tokens", async () => {
        await wallet.Transfer_ERC20(token.address, recipient, web3.utils.toWei('100', 'ether'), { from: deployer });

        const balance = await token.balanceOf(recipient);
        assert.equal(balance.toString(), web3.utils.toWei('100', 'ether'));
    });

    it("should fail to send ERC-20 tokens to an invalid address", async () => {
        const invalidAddress = "0x0000000000000000000000000000000000000000";
        await expectRevert(
            wallet.Transfer_ERC20(token.address, invalidAddress, web3.utils.toWei('100', 'ether'), { from: deployer }),
            "revert" 
        );
    });

    // Test case to ensure only the owner can initiate a transfer
    it("should only allow the owner to initiate a transfer", async () => {
        // Attempt to initiate a transfer from a non-owner account
        await expectRevert(
            wallet.Transfer_ERC20(token.address, recipient, web3.utils.toWei('50', 'ether'), { from: nonOwner }),
            "Ownable: caller is not the owner" 
        );
    });
});
