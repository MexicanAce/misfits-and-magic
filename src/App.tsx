import { useEffect, useState } from 'react';
import './App.scss';
import CharacterAttributes from './components/character-attributes/character-attributes';
import CharacterDescription from './components/character-description/character-description';
import CharacterInventory from './components/character-inventory/character-inventory';
import CharacterModel from './components/character-model/character-model';
import HamburgerMenu from './components/hamburger-menu/hamburger-menu';
import { Character, DefaultCharacter } from './types/Character';
import { Contract, Signer, Web3Provider } from 'zksync-web3';
import { ZkEraNft } from './types/ZkEraNFT';
import Web3Context, { Web3ContextType } from './context/web3-context';
import { initContracts } from './utils/web3-helper';
import CreateNewCharacterModal from './components/create-new-character-modal/create-new-character-modal';

function App() {
  const LocalStorageCharacterKey = 'mnm-character-v1';
  const localStorageCharacter = localStorage.getItem(LocalStorageCharacterKey);

  const initCharacter: Character = localStorageCharacter ?
    JSON.parse(localStorageCharacter) as Character :
    DefaultCharacter;

  const [character, setCharacter] = useState<Character>(initCharacter);
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [charactersContractInstance, setCharactersContractInstance] = useState<Contract | null>(null);
  const [nfts, setNfts] = useState<ZkEraNft[]>([]);
  const [characterIDs, setCharacterIDs] = useState<string[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [openCreateNewCharacterModal, setOpenCreateNewCharacterModal] = useState(false);

  const web3Context: Web3ContextType = {
    provider,
    setProvider,
    signer,
    setSigner,
    charactersContractInstance,
    setCharactersContractInstance,
    nfts,
    setNfts,
    characterIDs,
    setCharacterIDs,
    walletAddress,
    setWalletAddress,
  };

  useEffect(() => {
    localStorage.setItem(LocalStorageCharacterKey, JSON.stringify(character));
  }, [character]);

  useEffect(() => {
    if ((window as any).ethereum) {
      // Listen for accountsChanged event
      (window as any).ethereum.on("accountsChanged", async (accounts: any) => {
        const provider = new Web3Provider((window as any).ethereum);
        setProvider(provider);

        const signerInstance = provider.getSigner();
        setSigner(signerInstance);

        setWalletAddress(accounts[0]);

        const hasCharacter = await initContracts(web3Context, setCharacter, provider, signerInstance);
        setOpenCreateNewCharacterModal(!hasCharacter);
      });
    }
  }, [
    setProvider,
    setSigner,
    setCharacter,
    setWalletAddress,
    setNfts,
    setCharactersContractInstance,
    setCharacterIDs,
  ]);

  return (
    <Web3Context.Provider value={web3Context}>
      <div className="App">
        <div className="background-image"></div>
        <div className="background-filter"></div>

        <HamburgerMenu
          character={character}
          setCharacter={setCharacter}
        />

        {openCreateNewCharacterModal && (
          <CreateNewCharacterModal
            character={character}
            setCharacter={setCharacter}
            open={openCreateNewCharacterModal}
            handleClose={() => setOpenCreateNewCharacterModal(false)}
          />
        )}

        <div className="main-content">
          <div className="character-sheet-left">
            <CharacterDescription
              character={character}
              setCharacter={setCharacter}
            />
            <CharacterInventory
              character={character}
              setCharacter={setCharacter}
            />
            <CharacterAttributes
              character={character}
              setCharacter={setCharacter}
            />
          </div>
          <div className="character-sheet-right">
            <CharacterModel character={character} setCharacter={setCharacter} />
          </div>
        </div>
      </div>
    </Web3Context.Provider>
  );
}

export default App;
