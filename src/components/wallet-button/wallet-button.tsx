import { useState, useEffect, useContext, Dispatch, SetStateAction } from "react";
import { Web3Provider, Signer, Contract } from "zksync-web3";
import Web3Context from "../../context/web3-context";
import {
  CHARACTERS_ADDRESS,
  CHARACTERS_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
  NETWORK_NAME,
  NETWORK_ID,
} from "../../constants/constants";
import { ZkEraNft } from "../../types/ZkEraNFT";
import { Address } from "zksync-web3/build/src/types";
import { Character } from "../../types/Character";
import { CharacterSmartContract } from "../../types/CharacterSmartContract";
import "./wallet-button.scss";

function WalletButton({
    character,
    setCharacter,
  }: {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
  }) {
  const web3Context = useContext(Web3Context);
  const [networkOk, setNetworkOk] = useState(false);

  useEffect(() => {
    checkNetwork();
  }, []);

  const shortenAddress = (address: Address) => {
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

  const initContracts = async (provider: Web3Provider, signer: Signer) => {
    if (provider && signer) {
      const charactersContract = new Contract(
        CHARACTERS_ADDRESS,
        CHARACTERS_CONTRACT_ABI,
        signer
      );

      web3Context.setCharactersContractInstance(charactersContract);

      const allCharacterIDs: string[] = await charactersContract.getCharacterIDs();
      console.log(`getCharacterIDs: ${allCharacterIDs.join(",")}`);

      if (allCharacterIDs.length > 0) {
        web3Context.setCharacterIDs(allCharacterIDs);
        const characterData: CharacterSmartContract = await charactersContract.getCharacter(allCharacterIDs[0]);
        console.log(`Current character from smart contract: ${characterData}`);

        const character = JSON.parse(characterData.jsonData) as Character;
        
        setCharacter(character);
    } else {
        web3Context.setCharacterIDs(["first-character"]);
      }

      if (allCharacterIDs.length == 0) {
        return;
      }
      
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        NFT_CONTRACT_ABI,
        signer
      );

      const address = await signer.getAddress();
      const balance = 0 // TODO: await nftContract.balanceOf(address);
      if (balance > 0) {
        let ownedNfts: ZkEraNft[] = [];
        const ownedTokensResponse = await nftContract.tokensOfOwner(address);

        for (let i = 0; i < ownedTokensResponse.length; i++) {
          const tokenId = ownedTokensResponse[i];

          const tokenURI = await nftContract.tokenURI(tokenId);
          if (tokenURI == undefined || tokenURI == "") {
            continue;
          }

          const response = await fetch(tokenURI);
          if (!response.ok) {
            continue;
          }

          ownedNfts.push((await response.json()) as ZkEraNft);
        }

        web3Context.setNfts(ownedNfts);
      } else {
        web3Context.setNfts([]);
      }
    }
  };

  const checkNetwork = async () => {
    if ((window as any).ethereum) {
      const currentChainId = await (window as any).ethereum.request({
        method: "eth_chainId",
      });

      if (currentChainId == NETWORK_ID) setNetworkOk(true);
    }
  };

  const switchNetwork = async () => {
    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: NETWORK_ID }],
    });

    // refresh
    window.location.reload();
  };

  const connectWallet = async () => {
    if (!networkOk) await switchNetwork();
    try {
      if ((window as any).ethereum) {
        const provider = new Web3Provider((window as any).ethereum);
        web3Context.setProvider(provider);

        const data = await provider.send("eth_requestAccounts", []);
        
        const signerInstance = provider.getSigner();
        web3Context.setSigner(signerInstance);

        web3Context.setWalletAddress(data[0]);

        await initContracts(provider, signerInstance);
      }
    } catch (error) {
      console.error("Error connecting DApp to your wallet");
      console.error(error);
    }
  };

  return (
    <div className="wallet-button">
      {!networkOk ? (
        <button
          onClick={switchNetwork}
        >
          Wrong network. Switch to {NETWORK_NAME}
        </button>
      ) : (
        <button
          onClick={connectWallet}
          disabled={web3Context.walletAddress != ""}
        >
            {web3Context.walletAddress != ""
                ? `Connected ${shortenAddress(web3Context.walletAddress)}`
                : `Connect Wallet`}
        </button>
      )}
    </div>
  );
}

export default WalletButton;