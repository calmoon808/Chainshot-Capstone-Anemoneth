// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
contract Dcs is ERC20, Ownable {

    uint constant _initial_supply = 1000000 * (10**18);
    struct User {
        uint balance;
        bool isActive;
    }
    mapping(address => User) public users;
    constructor() ERC20("Decentralized Social Media", "DCS") {
        _mint(address(this), _initial_supply);
        //balanceOf(address(this));
    }

     function register() external payable{
        
        require(msg.value == 1 gwei);
        User storage user = users[msg.sender];
        require(!user.isActive,"create new user");
        user.isActive = true;
        _transfer(address(this), msg.sender, 1);
        //payable(msg.sender).transfer(100);
        
        
        //trade 1 gwei to DCS        
    }
    function mintViaOwner(uint256 _num) external onlyOwner {
        _mint(address(this), _num);
    }

  }

  
