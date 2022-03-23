const { ethers, upgrades } = require("hardhat");


async function main() {
  const value = ethers.BigNumber.from("1000000");
  const Dcs = await ethers.getContractFactory("Dcs");
  const proxy = await upgrades.deployProxy(Dcs, ["Decentralized Social", "DCS"]);
  await proxy.deployed();

  console.log(proxy.address);
}

main();