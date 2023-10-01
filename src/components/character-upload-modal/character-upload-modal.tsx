import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Character } from '../../types/Character';
import CustomModal from '../custom-modal/custom-modal';
import './character-upload-modal.scss';
import Web3Context from '../../context/web3-context';
import usePaymaster from '../../hooks/use-paymaster';
import { ethers } from 'ethers';

function CharacterUploadModal({
  character,
  setCharacter,
  open,
  handleClose,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  open: boolean;
  handleClose: () => void;
}) {
  const web3Context = useContext(Web3Context);
  const [cost, setCost] = useState<string>('');
  const [gas, setGas] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [failure, setFailure] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const hasNFT = web3Context.nfts.length > 0;
  
  useEffect(() => {
    estimateGas();
  }, []);
  
  async function estimateGas() {
    if (web3Context.provider == null || web3Context.charactersContractInstance == null) {
      return;
    }

    // Get gas price 
    let gasPrice = await web3Context.provider.getGasPrice();
    let price = ethers.utils.formatEther(gasPrice.toString());
    setPrice(price);

    // Estimate gas required for transaction
    let gasEstimate = await web3Context.charactersContractInstance.estimateGas["addCharacter"](
      web3Context.characterIDs[0],
      JSON.stringify(character),
      1
    );
    let gas = ethers.utils.formatEther(gasEstimate.toString());
    setGas(gas);

    // Calculate the cost: gasPrice * gasEstimate
    let transactionCost = gasPrice.mul(gasEstimate);
    let cost = ethers.utils.formatEther(transactionCost.toString());
    // Set the cost state
    setCost(cost);
  }

  async function onConfirm() {
    setFailure('');
    try {
      // If wallet connected, attempt to upload to Ethereum Smart Contract via Paymaster
      if (web3Context.charactersContractInstance != null) {
        setIsUploading(true);
        let txHandle;

        if (web3Context.nfts.length > 0) {
          const params = await usePaymaster({
            charactersContractInstance: web3Context.charactersContractInstance,
            id: web3Context.characterIDs[0],
            jsonData: JSON.stringify(character),
            price
          });

          txHandle = await web3Context.charactersContractInstance.addCharacter(
            web3Context.characterIDs[0],
            JSON.stringify(character),
            1,
            params
          );
        } else {
          txHandle = await web3Context.charactersContractInstance.addCharacter(
            web3Context.characterIDs[0],
            JSON.stringify(character),
            1
          );
        }

        // Wait until the transaction is committed
        await txHandle.wait();
        setIsUploading(false);
        handleClose();
      }
    } catch (error) {
      setIsUploading(false);
      console.error(error);
      if ((error as any).reason) {
        setFailure((error as any).reason);
      }
    }
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={'Upload Character'}>
      <div className="character-upload">
        <textarea
          cols={50}
          rows={20}
          readOnly
          value={JSON.stringify(character, null, 2)}/>
        {cost != "" && !hasNFT && (
          <div className="estimated-cost">
            <p>Estimated Cost:</p>
            <p>{cost} ETH</p>
          </div>
        )}
        {cost == "" && !hasNFT && (
          <div className="estimated-cost">Estimating cost...</div>
        )}
        {hasNFT && (
          <div className="estimated-cost">Congrats, you have the NFT so this upload is FREE!</div>
        )}
        {failure && (
          <div className="failure">{failure}</div>
        )}
      </div>
      <button
        className="modal-button"
        disabled={(!hasNFT && cost == "") || isUploading}
        onClick={onConfirm}>
        {isUploading ? "Uploading..." : "Confirm"}
      </button>
    </CustomModal>
  );
}

export default CharacterUploadModal;
