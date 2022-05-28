const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TheScatter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const TheScatter = await ethers.getContractFactory("TheScatter");
    const scatter = await TheScatter.deploy("Hello, world!");
    await scatter.deployed();

    expect(await scatter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await scatter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await scatter.greet()).to.equal("Hola, mundo!");
  });
});
