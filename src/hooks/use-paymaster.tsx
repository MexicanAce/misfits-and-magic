import { Contract, utils } from "zksync-web3";
import { PAYMASTER_CONTRACT_ADDRESS } from "../constants/constants";
import * as ethers from "ethers";

type PaymasterProps = {
    charactersContractInstance: Contract;
    id: string;
    jsonData: string;
    price: string;
};

const usePaymaster = async ({ charactersContractInstance, id, jsonData, price }: PaymasterProps) => {
    // estimate gasLimit via paymaster
    let gasPrice = ethers.utils.parseEther(price);
    const paymasterParams = utils.getPaymasterParams(
        PAYMASTER_CONTRACT_ADDRESS,
        {
            type: "General",
            // empty bytes as testnet paymaster does not use innerInput
            innerInput: new Uint8Array(),
        }
    );

    // estimate gasLimit via paymaster
    const gasLimit = await charactersContractInstance.estimateGas.addCharacter(
        id,
        jsonData,
        1, // version (for breaking changes to the JSON)
        {
            customData: {
                gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                paymasterParams: paymasterParams,
            },
        }
    );

    return {
        maxFeePerGas: gasPrice,
        maxPriorityFeePerGas: ethers.BigNumber.from(0),
        gasLimit,
        customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams,
        },
    };
};

export default usePaymaster;