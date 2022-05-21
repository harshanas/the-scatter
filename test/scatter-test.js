const { expect } = require("chai");
const { ethers } = require("hardhat");
const crypto = require("crypto");

describe("Scatter", function () {
    const blogName = "Newsblock";
    const contractName = "Scatter";
  
    it("Should create a story", async function () {
        const Scatter = await ethers.getContractFactory(contractName);
        const scatter = await Scatter.deploy(blogName);
        await scatter.deployed();

        const hash = crypto.randomBytes(20).toString('hex');
        await scatter.createStory("My first story", hash);
    
        const stories = await scatter.fetchStories();
        expect(stories[0].title).to.equal("My first story");
    });

    it("Should edit a story", async function () {
        const Scatter = await ethers.getContractFactory(contractName);
        const scatter = await Scatter.deploy(blogName);
        await scatter.deployed();

        const hash = crypto.randomBytes(20).toString('hex');
        await scatter.createStory("My Second story", hash);
        await scatter.updateStory(1, "My updated story", hash, true);
    
        stories = await scatter.fetchStories();
        expect(stories[0].title).to.equal("My updated story");
    });

    it("Should fetch stories", async function(){
        const Scatter = await ethers.getContractFactory(contractName);
        const scatter = await Scatter.deploy(blogName);
        await scatter.deployed();

        let hash = crypto.randomBytes(20).toString('hex');
        await scatter.createStory("My first story", hash);
        
        hash = crypto.randomBytes(20).toString('hex');
        await scatter.createStory("My second story", hash);

        const stories = await scatter.fetchStories();
        expect(stories.length).to.equal(2);
    });

    it("Should fetch single story", async function(){
        const Scatter = await ethers.getContractFactory(contractName);
        const scatter = await Scatter.deploy(blogName);
        await scatter.deployed();

        const firstStoryHash = crypto.randomBytes(20).toString('hex');
        await scatter.createStory("My first story", firstStoryHash);
        
        const secondStoryHash = crypto.randomBytes(20).toString('hex');
        await scatter.createStory("My second story", secondStoryHash);

        let story = await scatter.fetchStory(firstStoryHash);
        expect(story.title).to.equal("My first story");

        story = await scatter.fetchStory(secondStoryHash);
        expect(story.title).to.equal("My second story");
    })

});
