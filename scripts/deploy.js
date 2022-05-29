/* scripts/deploy.js */
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  /* these two lines deploy the contract to the network */
  const TheScatter = await hre.ethers.getContractFactory("TheScatter");
  const scatter = await TheScatter.deploy();

  await scatter.deployed();
  console.log("The Scatter deployed to:", scatter.address);

  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync('./config.js', `
  export const contractAddress = "${scatter.address}"
  export const ownerAddress = "${scatter.signer.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });