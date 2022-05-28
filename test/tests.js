const { expect } = require("chai");
const { stat } = require("fs");
const { ethers } = require("hardhat");

describe("TheScatter", function () {
  it("Should create a new Story", async function () {
    const TheScatter = await ethers.getContractFactory("TheScatter");
    const scatter = await TheScatter.deploy();
    await scatter.deployed();
    const ownerAddr = await scatter.owner();
   
    const storyOneTx = await scatter.createStory("Story One", "123456");
    await storyOneTx.wait();

    const story = await scatter.fetchStories(ownerAddr);

    expect(story[0].title).to.equal("Story One");
  });

  it("Should update a Story", async function () {
    const TheScatter = await ethers.getContractFactory("TheScatter");
    const scatter = await TheScatter.deploy();
    await scatter.deployed();
    const ownerAddr = await scatter.owner();

    const storyOneTx = await scatter.createStory("Story One", "123456");
    await storyOneTx.wait();

    const updatedStory = await scatter.updateStory(1, "Story One Point Two", "78912", true);
    await updatedStory.wait();

    const story = await scatter.fetchStory(ownerAddr, 1);

    expect(story.title).to.equal("Story One Point Two");
  });


});
