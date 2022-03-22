const ethers = require('ethers');
require('dotenv').config();

async function main() {

  const url = process.env.RINKEBY_URL;

  // woah, we just cut out the whole compile.js flow with this!
  let artifacts = await hre.artifacts.readArtifact("Dcs");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.METAMASK_PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Dcs Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let dcs = await factory.deploy();

  console.log("DCS address:", dcs.address);

  await dcs.deployed();
  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});