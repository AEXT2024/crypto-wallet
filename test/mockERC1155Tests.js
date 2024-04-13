const Wallet = artifacts.require("Wallet");
const mockERC1155 = artifacts.require("mockERC1155");

contract("ERC1155 Token Transfer Tests", (accounts) => {
    let wallet; 
    let mockERC1155;
    const [deployer, recipient] = accounts;

    before(async () => {
        wallet = await Wallet.deployed(); // Assign the deployed Wallet instance to the wallet variable
        mockERC1155 = await MockERC1155.deployed();
        
    });

    it("should correctly transfer ERC1155 tokens from the wallet", async () => {
        // Ensure this function call matches the expected parameters and function definition
        const tokenId = 1;
        const amount = 50;
        await wallet.Transfer_ERC1155(mockERC1155.address, recipient, tokenId, amount, { from: deployer });
        
    });

   
});
