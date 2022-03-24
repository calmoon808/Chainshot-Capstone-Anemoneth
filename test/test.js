const { ethers, upgrades } = require("hardhat");
const chai = require("chai");
const { assert, expect } = chai;
const { solidity } = require("ethereum-waffle");

chai.use(solidity);

describe("This is our main Dcs testing scope", function () {
    let dcsContract;
    let owner;
    let addr1;
    let Dcs;
    before("deploy the contract instance first", async function () {
        [owner, addr1] = await ethers.getSigners();
        Dcs = await ethers.getContractFactory("Dcs");
        dcsContract = await Dcs.deploy();
        await dcsContract.deployed();

        const tx = await dcsContract.connect(addr1).register({value: 1000000000}); // 1 Gwei
        await tx.wait();
      });
    it("Should register only once", async function () {        
        await expect(dcsContract.connect(addr1).register({value: 1000000000})).to.be.revertedWith("create new user");
        
    });
    it("Balance of addr1 is equal 1", async function () {  
        const balanceOfAddr1 = await dcsContract.balanceOf(addr1.address)      
        expect(balanceOfAddr1).to.equal(1);
        
    });

//     it("Deploy the Dcs ERC20 token", async function () {
//     const Dcs = await ethers.getContractFactory("Dcs");
//     const dcs = await Dcs.deploy();
//     await dcs.deployed();
//     const balanceOfDcs = await dcs.balanceOf();
//     console.log(balanceOfDcs);
//     //expect(balanceOfDcs.to.equal(1000000));
//   });
//   it("Deploy the Dcs ERC20 token", async function () {
//     const Dcs = await ethers.getContractFactory("Dcs");
//     const dcs = await Dcs.deploy(1000000);
//     await dcs.deployed();
//   });
});
