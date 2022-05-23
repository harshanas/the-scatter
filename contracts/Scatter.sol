//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Scatter is AccessControl {

    string public name;
    address public owner;
    
    bytes32 public constant EDITOR_ROLE = keccak256("EDITOR_ROLE");
    bytes32 public constant SUBSCRIBER_ROLE = keccak256("SUBSCRIBER_ROLE");

    using Counters for Counters.Counter;
    Counters.Counter private _storyIds;

    struct Story {
      uint id;
      string title;
      string content;
      bool published;
    }

    mapping(uint => Story) private idToStory;
    mapping(string => Story) private hashToStory;

    event StoryCreated(uint id, string title, string hash);
    event StoryUpdated(uint id, string title, string hash, bool published);

    constructor(string memory _name) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        console.log("Deploying Blog with name:", _name);
        name = _name;
        owner = msg.sender;
    }

    function fetchStory(string memory hash) public view returns(Story memory){
      return hashToStory[hash];
    }

    function createStory(string memory title, string memory hash) public onlyOwner {
        require( isAllowed(msg.sender, EDITOR_ROLE), "Caller is not an editor");

        _storyIds.increment();
        uint storyId = _storyIds.current();
        
        Story storage story = idToStory[storyId];
        story.id = storyId;
        story.title = title;
        story.published = true;
        story.content = hash;
        hashToStory[hash] = story;
        emit StoryCreated(storyId, title, hash);
    }

    function updateStory(uint storyId, string memory title, string memory hash, bool published) public onlyOwner {
        require( isAllowed(msg.sender, EDITOR_ROLE), "Caller is not an editor");
        Story storage story =  idToStory[storyId];
        story.title = title;
        story.published = published;
        story.content = hash;
        idToStory[storyId] = story;
        hashToStory[hash] = story;
        emit StoryUpdated(story.id, title, hash, published);
    }

    function fetchStories() public view returns (Story[] memory) {
        uint itemCount = _storyIds.current();

        Story[] memory stories = new Story[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Story storage currentItem = idToStory[currentId];
            stories[i] = currentItem;
        }
        return stories;
    }

    function isAllowed(address callerId, bytes32 role ) private view returns (bool) {
        return  ( hasRole(role, callerId) || hasRole(DEFAULT_ADMIN_ROLE, callerId) );
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
}
