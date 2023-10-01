// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Characters {
    // Map of wallets to Characters by ID, this way, each address has an array of Characters assigned to them.
    mapping (address => mapping(string => Character)) private characters;
    mapping (address => string[]) private characterIDs;

    struct Character {
        string jsonData;
        uint16 version;
    }

    // Emits an event when a new character is added
    event characterAdded(address user, string id, string jsonData, uint16 version);

    // Gets the characters for the address who called the function
    function getCharacterIDs() public view returns (string[] memory){
        console.log("getCharacterIDs called");

        return characterIDs[msg.sender];
    }

    function getCharacter(string memory id) public view returns (Character memory) {
        console.log("getCharacter is called");

        require(characters[msg.sender][id].version > 0, "There are no characters for this address");
        
        return characters[msg.sender][id];
    }

    function characterIdExists(address user, string memory id) private view returns (bool) {
        for (uint i; i < characterIDs[user].length; i++) {
            if (keccak256(abi.encodePacked(characterIDs[user][i])) == keccak256(abi.encodePacked(id))) {
                return true;
            }
        }
        return false;
    }

    // Update character to the user's Characters list who called the function.
    // If it doesn't exist, add it
    function addCharacter(string memory id, string memory jsonData, uint16 version) public {
        // require the id to not be empty.
        require(bytes(id).length > 0, "id is empty!");
        
        // require the jsonData to not be empty.
        require(bytes(jsonData).length > 0, "jsonData is empty!");
        
        // require the version to be greater than 0
        require(version > 0, "version is empty!");

        console.log("addCharacter called");
        console.log(id);
        console.log(jsonData);
        console.log(version);

        // adds the character id to storage if new
        if (!characterIdExists(msg.sender, id)) {
            characterIDs[msg.sender].push(id);
        }

        // updates the characters storage
        Character memory character = Character(jsonData, version);
        characters[msg.sender][id] = character;

        // emits character added event
        emit characterAdded(msg.sender, id, character.jsonData, character.version);
    }
}