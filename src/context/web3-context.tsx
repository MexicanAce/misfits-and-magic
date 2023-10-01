import React from 'react';

import { Contract, Web3Provider, Signer } from "zksync-web3";
import { ZkEraNft } from "../types/ZkEraNFT";

export interface Web3ContextType {
  provider: Web3Provider | null;
  setProvider: (provider: Web3Provider | null) => void;
  signer: Signer | null;
  setSigner: (signer: Signer | null) => void;
  charactersContractInstance: Contract | null;
  setCharactersContractInstance: (instance: Contract | null) => void;
  nfts: ZkEraNft[];
  setNfts: (nfts: ZkEraNft[]) => void;
  characterIDs: string[];
  setCharacterIDs: React.Dispatch<React.SetStateAction<string[]>>;
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const defaultWeb3State: Web3ContextType = {
  provider: null,
  setProvider: () => {},
  signer: null,
  setSigner: () => {},
  charactersContractInstance: null,
  setCharactersContractInstance: () => {},
  nfts: [],
  setNfts: () => {},
  characterIDs: [],
  setCharacterIDs: () => {},
  walletAddress: "",
  setWalletAddress: () => {},
};

const Web3Context = React.createContext<Web3ContextType>(defaultWeb3State);

export default Web3Context;