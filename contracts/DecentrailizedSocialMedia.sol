// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Dcs.sol";
contract DecentrailizedSocialMedia is Ownable{

    Dcs token;
    constructor(address DcsAddr){
        token = Dcs(DcsAddr); //get the token address
    }
    struct User {
        uint balance;
        bool isActive;
    }
    mapping(address => User) public users;
    
    function register() external payable{
        
        require(msg.value == 1 gwei);
        User storage user = users[msg.sender];
        require(!user.isActive,"create new user");
        user.isActive = true;
        //payable(msg.sender).transfer(100);
        token.transfer(msg.sender,1);
        
        //trade 1 gwei to DCS        
    }
     function isRegistered(address addr) external view returns(bool) {
        return users[addr].isActive;
    }

    function getBalance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }
    // fallback function
  receive() external payable {}
  fallback() external payable {}
}