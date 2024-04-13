// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is ERC1155Receiver, ReentrancyGuard, Ownable { 
    event EtherReceived(address sender, uint amount);
    event EtherSent(address recipient, uint amount);
    event ERC20Sent(address token, address to, uint256 amount);
    event ERC1155Sent(address token, address to, uint256 id, uint256 amount);

    // Receive Ether
    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    // Withdraw Ether
    function Withdraw_Ether(address payable to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        (bool success,) = to.call{value: amount}("");
        require(success, "Transfer failed");
        emit EtherSent(to, amount);
    }

    // Transfer ERC-20 Tokens
    function Transfer_ERC20(IERC20 token, address to, uint256 amount) external onlyOwner nonReentrant {
        require(token.balanceOf(address(this)) >= amount, "Insufficient token balance");
        bool success = token.transfer(to, amount);
        require(success, "Token transfer failed");
        emit ERC20Sent(address(token), to, amount);
    }

    // Transfer ERC-1155 Tokens
    function Transfer_ERC1155(IERC1155 token, address to, uint256 id, uint256 amount) external onlyOwner nonReentrant {
        token.safeTransferFrom(address(this), to, id, amount, "");
        emit ERC1155Sent(address(token), to, id, amount);
    }

    // Check Ether Balance
    function Check_Balance() external view returns (uint) {
        return address(this).balance;
    }

    // Implement onERC1155Received and onERC1155BatchReceived functions to correctly handle ERC1155 tokens
    function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    // Override supportsInterface to correctly indicate support for ERC1155 token reception
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IERC1155).interfaceId 
        || interfaceId == type(IERC1155Receiver).interfaceId
        || super.supportsInterface(interfaceId);
}

}

