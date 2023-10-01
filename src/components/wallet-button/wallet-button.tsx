import { useState, useEffect, useContext, Dispatch, SetStateAction } from "react";
import { Web3Provider } from "zksync-web3";
import Web3Context from "../../context/web3-context";
import {
  NETWORK_NAME,
  NETWORK_ID,
} from "../../constants/constants";
import { Address } from "zksync-web3/build/src/types";
import { Character } from "../../types/Character";
import "./wallet-button.scss";
import { initContracts } from "../../utils/web3-helper";
import { ethers } from "ethers";

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

  const checkNetwork = async () => {
    if ((window as any).ethereum) {
      const currentChainId = await (window as any).ethereum.request({
        method: "eth_chainId",
      });

      if (currentChainId == NETWORK_ID) {
        setNetworkOk(true);
      }
    }
  };

  const switchNetwork = async () => {
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexlify(NETWORK_ID).replace("0x0", "0x") }],
      });
  
      setNetworkOk(true);
    } catch (error) {
      // User did not update networks
      console.error(error); 
    }
  };

  const connectWallet = async () => {
    if (!networkOk) {
      await switchNetwork();
    }

    try {
      if ((window as any).ethereum) {
        const provider = new Web3Provider((window as any).ethereum);
        web3Context.setProvider(provider);

        const data = await provider.send("eth_requestAccounts", []);
        
        const signerInstance = provider.getSigner();
        web3Context.setSigner(signerInstance);

        web3Context.setWalletAddress(data[0]);

        await initContracts(web3Context, setCharacter, provider, signerInstance);
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
          onClick={connectWallet}
        >
          Wrong network, switch to {NETWORK_NAME}
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