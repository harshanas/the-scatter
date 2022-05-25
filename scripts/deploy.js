const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Scatter = await hre.ethers.getContractFactory("Scatter");
  const scatter = await Scatter.deploy("Newsblock");
  await scatter.deployed();
  console.log("Scatter deployed to:", scatter.address);

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