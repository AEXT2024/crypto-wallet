const Wallet = artifacts.require("Wallet");
const MockERC1155 = artifacts.require("MockERC1155");

contract("ERC1155 Wallet Tests", (accounts) => {
    let wallet;
    let mockERC1155;
    const [deployer, recipient] = accounts;

    before(async () => {
        wallet = await Wallet.deployed();
        mockERC1155 = await MockERC1155.deployed();
    });

    it("should mint ERC1155 tokens to the wallet", async () => {
        await mockERC1155.mint(wallet.address, 1, 100, "0x0", { from: deployer });
    });

    it("should transfer ERC1155 tokens from the wallet to recipient", async () => {
       
        await wallet.Transfer_ERC1155(mockERC1155.address, recipient, 1, 50, { from: deployer });
    });
});
