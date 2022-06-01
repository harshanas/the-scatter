//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TheScatter {
    address public owner;
    uint public authorsCount;
    uint public storiesCount;

    using Counters for Counters.Counter;
    Counters.Counter private _storyIds;

    constructor() {
        console.log("Deploying The Scatter Contract");
        owner = msg.sender;
        authorsCount = 0;
        storiesCount = 0;
    }

    struct Story {
      uint id;
      string title;
      string content;
      bool isPublished;
      uint createdAt;
      uint updatedAt;
    }

    mapping(uint => Story) private idToStory;
    mapping(string => Story) private hashToStory;
    mapping(uint => address) private storyIdToWalletAddr;
    mapping(address => uint[]) private walletAddrToStoryId;

    event PostCreated(uint id, string title, string hash);
    event PostUpdated(uint id, string title, string hash, bool isPublished);

    function createStory(string memory title, string memory hash) public {
        _storyIds.increment();
        uint storyId = _storyIds.current();

        Story storage story = idToStory[storyId];
        story.id = storyId;
        story.title = title;
        story.isPublished = true;
        story.content = hash;
        story.createdAt = block.timestamp;
        story.updatedAt = block.timestamp;

        hashToStory[hash] = story;
        
        storyIdToWalletAddr[storyId] = msg.sender;
        if (walletAddrToStoryId[msg.sender].length == 0){
            authorsCount++;
        }
        storiesCount++;
        walletAddrToStoryId[msg.sender].push(storyId);

        emit PostCreated(storyId, title, hash);
    }

    function updateStory(uint storyId, string memory title, string memory hash, bool isPublished) public  {
        address walletAddr = storyIdToWalletAddr[storyId];
        require(msg.sender == walletAddr, "Only the author can edit their story");

        Story storage story =  idToStory[storyId];
        story.title = title;
        story.isPublished = isPublished;
        story.content = hash;
        story.updatedAt = block.timestamp;

        hashToStory[hash] = story;

        emit PostUpdated(story.id, title, hash, isPublished);
    }

    function fetchStories(address walletAddr) public view returns (Story[] memory) {
        uint storyCountByAuthor = walletAddrToStoryId[walletAddr].length;

        Story[] memory stories = new Story[](storyCountByAuthor);
        for (uint currentIndex = 0; currentIndex < storyCountByAuthor; currentIndex++) {

            Story storage currentItem = idToStory[walletAddrToStoryId[walletAddr][currentIndex]];
            stories[currentIndex] = currentItem;
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
