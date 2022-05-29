const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TheScatter", function () {
  it("Should create a new Story", async function () {
    const TheScatter = await ethers.getContractFactory("TheScatter");
    const scatter = await TheScatter.deploy();
    await scatter.deployed();
    const ownerAddr = await scatter.owner();
   
    const storyOneTx = await scatter.createStory("Story One", "123456");
    await storyOneTx.wait();

    const stories = await scatter.fetchStories(ownerAddr);

    expect(stories[0].title).to.equal("Story One");
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

  it("Should fetch Stories from the Wallet Address", async function () {
    const TheScatter = await ethers.getContractFactory("TheScatter");
    const scatter = await TheScatter.deploy();
    await scatter.deployed();
    const ownerAddr = await scatter.owner();

    let storyTx = await scatter.createStory("Story One", "123456");
    await storyTx.wait();
    storyTx = await scatter.createStory("Story Two", "213456");
    await storyTx.wait();
    storyTx = await scatter.createStory("Story Three", "312456");
    await storyTx.wait();

    let stories = await scatter.fetchStories(ownerAddr);
    expect(stories.length).to.equal(3);
    
    stories = await scatter.fetchStories("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    expect(stories.length).to.equal(0);
  });

  it("Should fetch Story by ID and the Wallet Address", async function () {
    const TheScatter = await ethers.getContractFactory("TheScatter");
    const scatter = await TheScatter.deploy();
    await scatter.deployed();
    const ownerAddr = await scatter.owner();

    const storyTx = await scatter.createStory("Story One", "123456");
    await storyTx.wait();

    const story = await scatter.fetchStory(ownerAddr, 1);
    expect(story.title).to.equal("Story One");

  });


});
