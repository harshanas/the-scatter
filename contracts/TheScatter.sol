//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TheScatter {
    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _storyIds;

    constructor() {
        console.log("Deploying The Scatter Contract");
        owner = msg.sender;
    }

    struct Story {
      uint id;
      string title;
      string content;
      bool isPublished;
    }

    mapping(uint => Story) private idToStory;
    mapping(string => Story) private hashToStory;
    mapping(uint => address) private storyIdToWalletAddr;
    mapping(address => Story[]) private walletAddrToStory;

    event PostCreated(uint id, string title, string hash);
    event PostUpdated(uint id, string title, string hash, bool published);

    function createStory(string memory title, string memory hash) public {
        _storyIds.increment();
        uint storyId = _storyIds.current();

        Story storage story = idToStory[storyId];
        story.id = storyId;
        story.title = title;
        story.isPublished = true;
        story.content = hash;

        hashToStory[hash] = story;
        
        storyIdToWalletAddr[storyId] = msg.sender;
        uint currentStoryCountByAuthor = walletAddrToStory[msg.sender].length;
        walletAddrToStory[msg.sender][currentStoryCountByAuthor+1] = story;

        emit PostCreated(storyId, title, hash);
    }

    function updateStory(uint storyId, string memory title, string memory hash, bool isPublished) public  {
        address authorId = storyIdToWalletAddr[storyId];
        require(msg.sender == authorId, "Only the author can edit their story");

        Story storage story =  idToStory[storyId];
        story.title = title;
        story.isPublished = isPublished;
        story.content = hash;

        hashToStory[hash] = story;

        emit PostUpdated(story.id, title, hash, isPublished);
    }

    function fetchStories(address authorId) public view returns (Story[] memory) {
        uint storyCountByAuthor = walletAddrToStory[authorId].length;

        Story[] memory stories = new Story[](storyCountByAuthor);
        for (uint currentStoryId = 0; currentStoryId < storyCountByAuthor; currentStoryId++) {

            Story storage currentItem = walletAddrToStory[authorId][currentStoryId];
            stories[currentStoryId] = currentItem;
        }
        return stories;
    }

    function fetchStory(address walletAddr, uint storyId) public view returns (Story memory){
        require(storyIdToWalletAddr[storyId] == walletAddr, "Cannot find the story");
        return idToStory[storyId];
    }

    modifier onlyOwner() {
      require(msg.sender == owner);
    _;
    }

}
