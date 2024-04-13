const Wallet = artifacts.require("Wallet");
const MockERC1155 = artifacts.require("MockERC1155");

contract("ERC1155 Token Transfer Tests", function ([deployer, recipient]) {
    let wallet, mockERC1155;

    before(async function () {
        console.log("Deploying wallet...");
        wallet = await Wallet.deployed();
        console.log(`Wallet deployed at address: ${wallet.address}`);

        mockERC1155 = await MockERC1155.deployed();
        console.log(`MockERC1155 deployed at address: ${mockERC1155.address}`);

    
        // Mint tokens to the wallet for testing
        await mockERC1155.mint(wallet.address, 1, 50, "0x0", { from: deployer });
    });

    it("should correctly transfer ERC1155 tokens from the wallet", async function () {
        const tokenAddress = mockERC1155.address;
        const recipientAddress = recipient;
        const tokenId = 1; // Example token ID
        const tokenAmount = 50; // Example token amount

        // Debugging: Log the parameters to ensure correctness
        console.log('Debugging Transfer_ERC1155 call:');
        console.log('tokenAddress:', tokenAddress, 'recipientAddress:', recipientAddress, 'tokenId:', tokenId, 'tokenAmount:', tokenAmount);
        console.log('Transaction options:', { from: deployer });

        // Call the Transfer_ERC1155 function with the logged parameters
        await wallet.Transfer_ERC1155(tokenAddress, recipientAddress, tokenId, tokenAmount, { from: deployer });

        // Verify the recipient received the tokens
        const recipientBalance = await mockERC1155.balanceOf(recipientAddress, tokenId);
        assert.equal(recipientBalance.toString(), tokenAmount.toString(), "Recipient did not receive the expected amount of tokens");

        // Optionally, verify the wallet's token balance decreased
        const walletBalance = await mockERC1155.balanceOf(wallet.address, tokenId);
        assert.equal(walletBalance.toString(), "0", "Wallet should have 0 tokens of the given ID left after the transfer");
    });

    
});
