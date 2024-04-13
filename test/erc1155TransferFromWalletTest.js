const Wallet = artifacts.require("Wallet");
const MockERC1155 = artifacts.require("MockERC1155");

contract("ERC1155 Transfer From Wallet Test", ([deployer, recipient]) => {
    let wallet, mockERC1155;

    before(async () => {
        wallet = await Wallet.deployed();
        mockERC1155 = await MockERC1155.deployed();
        // Mint tokens to the wallet for testing
        await mockERC1155.mint(wallet.address, 1, 100, "0x0", { from: deployer });
    });

    it("should correctly transfer ERC1155 tokens from wallet to recipient", async () => {
        const tokenId = 1;
        const amount = 50; // Amount to transfer

        await wallet.Transfer_ERC1155(mockERC1155.address, recipient, tokenId, amount, { from: deployer });

        // Verify recipient's balance
        const balanceRecipient = await mockERC1155.balanceOf(recipient, tokenId);
        assert.equal(balanceRecipient.toString(), "50", "Recipient did not receive the correct amount of tokens");

        // Verify wallet's balance
        const balanceWallet = await mockERC1155.balanceOf(wallet.address, tokenId);
        assert.equal(balanceWallet.toString(), "50", "Wallet's token balance did not decrease correctly");
    });
});
