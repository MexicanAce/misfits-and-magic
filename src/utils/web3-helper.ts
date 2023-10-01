import { Contract, Signer, Web3Provider } from "zksync-web3";
import { CHARACTERS_ADDRESS, CHARACTERS_CONTRACT_ABI, NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants/constants";
import { Web3ContextType } from "../context/web3-context";
import { CharacterSmartContract } from "../types/CharacterSmartContract";
import { Character } from "../types/Character";
import { Dispatch, SetStateAction } from "react";
import { ZkEraNft } from "../types/ZkEraNFT";

export const initContracts = async (
  web3Context: Web3ContextType,
  setCharacter: Dispatch<SetStateAction<Character>>,
  provider: Web3Provider,
  signer: Signer,
) => {
  if (provider && signer) {
    const charactersContract = new Contract(
      CHARACTERS_ADDRESS,
      CHARACTERS_CONTRACT_ABI,
      signer
    );

    web3Context.setCharactersContractInstance(charactersContract);

    const allCharacterIDs: string[] = await charactersContract.getCharacterIDs();

    if (allCharacterIDs.length > 0) {
      web3Context.setCharacterIDs(allCharacterIDs);
      const characterData: CharacterSmartContract = await charactersContract.getCharacter(allCharacterIDs[0]);

      const character = JSON.parse(characterData.jsonData) as Character;
      setCharacter(character);
    } else {
      web3Context.setCharacterIDs(["first-character"]);
    }

    const nftContract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      signer
    );

    const address = await signer.getAddress();
    const balance = await nftContract.balanceOf(address);
    if (balance > 0) {
      let ownedNfts: ZkEraNft[] = [];

      // TODO: Enable this once "tokensOfOwner(...)" is implemented for NFT
      // const ownedTokensResponse = await nftContract.tokensOfOwner(address);

      // for (let i = 0; i < ownedTokensResponse.length; i++) {
      //   const tokenId = ownedTokensResponse[i];

      //   const tokenURI = await nftContract.tokenURI(tokenId);
      //   if (tokenURI == undefined || tokenURI == "") {
      //     continue;
      //   }

      //   const response = await fetch(tokenURI);
      //   if (!response.ok) {
      //     continue;
      //   }

      //   ownedNfts.push((await response.json()) as ZkEraNft);
      // }

      ownedNfts.push({
        "attributes": [
          {
            "type": "graffiti",
            "value": "Purple"
          }
        ],
        "description": "The zkSync Era's most beloved NFT.",
        "image": "ipfs://QmdTzgiRz8HraX8Qzp5XJudYZ8h34deVo5ndxeoJNCvkcX",
        "name": "Era User"
      });

      web3Context.setNfts(ownedNfts);
    } else {
      web3Context.setNfts([]);
    }
  }
};