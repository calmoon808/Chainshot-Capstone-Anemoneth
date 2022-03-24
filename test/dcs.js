// const { ethers, upgrades } = require("hardhat");
// const chai = require("chai");
// const { assert, expect } = chai;
// const { solidity } = require("ethereum-waffle");

// chai.use(solidity);

// describe("Dcs ", function () { 
//   let Dcs;
//   let owner;
//   let user1;
//   let user2;
//   let user3;
//   let user4;
//   let user5;
//   let user6;
//   let decentrailizedsocialmedia;
//   let initialBalance;
  
//   before(async function() {

//     const ERC20 = await ethers.getContractFactory("Dcs");
            
//     token1 = await ERC20.deploy();
//     await token1.deployed();

//     [owner, user1, user2, user3, user4, user5, user6] = await ethers.getSigners();

    
//     const DecentrailizedSocialMedia = await ethers.getContractFactory("DecentrailizedSocialMedia");
//     decentrailizedsocialmedia = await DecentrailizedSocialMedia.deploy(token1.address);
//     //DcsContract = await upgrades.deploy(Dcs, ["anemoneth", "CLWN", 9000000000000, 10000]);

//     initialBalance = await user1.getBalance();

//     const tx = await decentrailizedsocialmedia.connect(user1).register({value: 1000000000}); // 1 Gwei
//     await tx.wait();
//     const tx2 = await decentrailizedsocialmedia.connect(user2).register({value: 1000000000}); // 1 Gwei
//     await tx2.wait(); 
//     const tx3 = await decentrailizedsocialmedia.connect(user3).register({value: 1000000000}); // 1 Gwei
//     await tx3.wait(); 
//     const tx4 = await decentrailizedsocialmedia.connect(user4).register({value: 1000000000}); // 1 Gwei
//     await tx4.wait(); 
//     const tx5 = await decentrailizedsocialmedia.connect(user5).register({value: 1000000000}); // 1 Gwei
//     await tx5.wait();
    
    

//   });
//   describe("First week", function() {
//     it("Should not allow user to register twice", async function () {        
//       await expect(decentrailizedsocialmedia.connect(user1).register({value: 1000000000})).to.be.revertedWith("create new user");
//     });
//     it("Should check if correct amount of Gwei was sent", async function () {        
//       const user1Balance = await user1.getBalance();
//       let a = ethers.BigNumber.from(user1Balance);
//       let b = ethers.BigNumber.from(initialBalance);
      
//       //a.sub(b);
//       expect(a).to.equal(b.sub(b.sub(a)));
//       //expect(user1Balance).to.equal(ethers.BigNumber.from(initialBalance - (initialBalance - user1Balance)));
//     });
//     it("Should check ERC20 Token", async function () {        
//       const user1ERC20Token = await token1.balanceOf(user1.address);
      
      
//       //a.sub(b);
//       expect(user1ERC20Token).to.equal(100);
//       //expect(user1Balance).to.equal(ethers.BigNumber.from(initialBalance - (initialBalance - user1Balance)));
//     });
//     // it("weeklyInfoArr should have one week added", async function () {
//     //   const weekNumber = await token.connect(owner).getWeekCount();
//     //   expect(weekNumber).to.equal(1);
//     // });
//     // it("Users should have a correct allocation", async function () {
//     //   const user1Balance = await token.getCurrRedeemable(user1.address);
//     //   expect(user1Balance).to.equal(2);
//     // });
//     // it("Users should have a correct distribution", async function () {
//     //   const user5Balance = await token.getCurrRedeemable(user5.address);
//     //   expect(user5Balance).to.equal(4);
//     // });
//     // it("Contract CLWN balance should increase due to settleUp's mint", async function () {
//     //   const contractClwnBalance = await token.balanceOf(token.address);
//     //   expect(contractClwnBalance).to.equal(10004);
//     // });
//     // it("mintViaOwner function should work for only the owner", async function () {
//     //   await expect(token.connect(user1).mintViaOwner(1)).to.be.reverted;
//     // });
//     // it("mintViaOwner should work for the owner", async function () {
//     //   await token.connect(owner).mintViaOwner(1)
//     //   const contractClwnBalance = await token.balanceOf(token.address);
//     //   expect(contractClwnBalance).to.equal(10005);
//     // });
//     // it("mintViaOwner should work for the owner for a big number", async function () {
//     //   await token.connect(owner).mintViaOwner(1000)
//     //   const contractClwnBalance = await token.balanceOf(token.address);
//     //   expect(contractClwnBalance).to.equal(11005);
//     // });
//   });

//   // describe("Second week", function() {
//   //   before(async function() {
//   //     const tx6 = await token.connect(user6).register({value: 1000000000}); // 1 Gwei
//   //     await tx6.wait();
//   //     await token.connect(owner).settleUp([user1.address, user2.address], [user3.address, user4.address], [user5.address, user6.address]);
//   //   })
//   //   it("weeklyInfoArr should have one week added", async function () {
//   //     const weekNumber = await token.getWeekCount();
//   //     expect(weekNumber).to.equal(2);
//   //   });
//   //   it("User 6 should be properly added and allocated to", async function () {
//   //     const user6Balance = await token.getCurrRedeemable(user6.address);
//   //     expect(user6Balance).to.equal(4);
//   //   });
//   //   it("User 5 should be properly distributed to", async function () {
//   //     const user5Balance = await token.getCurrRedeemable(user5.address);
//   //     expect(user5Balance).to.equal(7);
//   //   });
//   //   it("Contract CLWN balance should only be one less as a result of user6", async function () {
//   //     const contractClwnBalance = await token.balanceOf(token.address);
//   //     expect(contractClwnBalance).to.equal(11016);
//   //   });
//   // });

//   // describe("Working w/ empty earning tier + non-earning users", function() {
//   //   before(async function() {
//   //     await token.connect(owner).settleUp([user1.address, user2.address], [user3.address, user4.address], []);
//   //   })
//   //   it("weeklyInfoArr should have one week added", async function () {
//   //     const weekNumber = await token.connect(owner).getWeekCount();
//   //     expect(weekNumber).to.equal(3);
//   //   });
//   // });

//   // describe("Non-Active week", function() {
//   //   before(async function() {
//   //     await token.connect(owner).settleUp([], [], []);
//   //   })
//   //   it("weeklyInfoArr should have one week added", async function () {
//   //     const weekNumber = await token.connect(owner).getWeekCount();
//   //     expect(weekNumber).to.equal(4);
//   //   });
//   //   it("Contract CLWN balance should increase w/ allocations", async function () {
//   //     const contractClwnBalance = await token.balanceOf(token.address);
//   //     expect(contractClwnBalance).to.equal(11022);
//   //   });
//   // })
//   // describe("Allocation", function() {
//   //   it("Should be correct for user1", async function () {
//   //     const user1Allocation = await token.getCurrRedeemable(user1.address);
//   //     expect(user1Allocation).to.equal(4);
//   //   });
//   //   it("Should be correct for user5", async function () {
//   //     const user5Allocation = await token.getCurrRedeemable(user5.address);
//   //     expect(user5Allocation).to.equal(7);
//   //   });
//   //   it("Should be correct for user6", async function () {
//   //     const user6Allocation = await token.getCurrRedeemable(user6.address);
//   //     expect(user6Allocation).to.equal(4);
//   //   });
//   // })
//   // describe("Redemption", function() {
//   //   it("Balance before redemption should be one (from registration)", async function () {
//   //     const user1Redeemed = await token.balanceOf(user1.address)
//   //     expect(user1Redeemed).to.equal(1);
//   //   });
//   //   it("By user 1 should give them all of their tokens", async function () {
//   //     await token.connect(user1).redeem(user1.address);
//   //     const user1Redeemed = await token.balanceOf(user1.address)
//   //     expect(user1Redeemed).to.equal(5);
//   //   });
//   //   it("By user 1 should adjust their current redeemable value", async function () {
//   //     const user1Allocation = await token.getCurrRedeemable(user1.address);
//   //     expect(user1Allocation).to.equal(0);
//   //   });
//   //   it("By user 1 should accordingly decrease contract's balance", async function () {
//   //     const user1Allocation = await token.balanceOf(token.address);
//   //     expect(user1Allocation).to.equal(11018);
//   //   });
//   // })
//   // describe("User1 tipping User2 1 CLWN", async function() {
//   //   before(async function() {
//   //     await token.connect(user1).transfer(user2.address, 1)
//   //   });
//   //   it("Should decrease User1 balance by 1", async function () {
//   //     const balanceOfUser1 = await token.balanceOf(user1.address)
//   //     expect(balanceOfUser1).to.equal(4);
//   //   });
//   //   it("Should increase User2 balance by 1 (before their redemption)", async function () {
//   //     const balanceOfUser2 = await token.balanceOf(user2.address)
//   //     expect(balanceOfUser2).to.equal(2);
//   //   });
//   //   it("After redemption User2 should have 7 tokens", async function () {
//   //     await token.connect(user2).redeem(user2.address);
//   //     const user2Redeemed = await token.balanceOf(user2.address)
//   //     expect(user2Redeemed).to.equal(6);
//   //   });
//   });