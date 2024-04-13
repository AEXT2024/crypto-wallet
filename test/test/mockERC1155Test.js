it("should correctly transfer ERC1155 tokens from the wallet", async () => {
  

  // Perform the transfer from the wallet to the recipient.
  await wallet.Transfer_ERC1155(mockERC1155.address, recipient, 1, 50, { from: deployer });

  // Verify the recipient received the tokens.
  const recipientBalance = await mockERC1155.balanceOf(recipient, 1);
  assert.equal(recipientBalance.toString(), "50", "Recipient should have received 50 tokens of ID 1");

  // Optionally, verify the wallet's balance decreased.
  const walletBalance = await mockERC1155.balanceOf(wallet.address, 1);
  assert.equal(walletBalance.toString(), "50", "Wallet should have 50 tokens of ID 1 left after the transfer");
});
