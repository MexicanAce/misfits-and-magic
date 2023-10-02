import { Provider, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment, HttpNetworkUserConfig } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// load env file
import * as dotenv from "dotenv";
dotenv.config();

const env = process.env.DEPLOY_ENV || "local";

// load wallet private key from env file
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";
// The address of the NFT collection contract
const NFT_COLLECTION_ADDRESS = process.env.ADDRESS_OF_NFT_COLLECTION_CONTRACT || "";

if (!PRIVATE_KEY)
  throw "⛔️ WALLET_PRIVATE_KEY not detected! Add it to the .env file!";

if (!NFT_COLLECTION_ADDRESS)
  throw "⛔️ ADDRESS_OF_NFT_COLLECTION_CONTRACT not detected! Add it to the .env file!";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Characters & NftGatedPaymaster contract...`);
  const network = hre.userConfig.networks?.zkSyncNetwork;
  const provider =  new Provider((network as HttpNetworkUserConfig).url);
  const wallet = new Wallet(PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);

  // Deploying characters smart contract
  const charactersArtifact = await deployer.loadArtifact("Characters");
  const charactersContract = await deployer.deploy(charactersArtifact, []);

  const contractAddress = charactersContract.address;
  console.log(`${charactersArtifact.contractName} was deployed to ${contractAddress}`);

  if (env != "local") {
    // Verify contract programmatically
    //
    // Contract MUST be fully qualified name (e.g. path/sourceName:contractName)
    const contractFullyQualifedName = "contracts/Characters.sol:Characters";
    const verificationId = await hre.run("verify:verify", {
      address: contractAddress,
      contract: contractFullyQualifedName,
      constructorArguments: [],
      bytecode: charactersArtifact.bytecode,
    });

    console.log(`${contractFullyQualifedName} verified! VerificationId: ${verificationId}`);
  }

  // Deploying the paymaster
  const paymasterArtifact = await deployer.loadArtifact("NftGatedPaymaster");
  console.log("deploying paymaster...");
  const paymaster = await deployer.deploy(paymasterArtifact, [
    NFT_COLLECTION_ADDRESS,
  ]);
  console.log(`Paymaster address: ${paymaster.address}`);

  console.log("Funding paymaster with ETH");
  // Supplying paymaster with ETH
  await (
    await deployer.zkWallet.sendTransaction({
      to: paymaster.address,
      value: ethers.utils.parseEther("0.005"),
    })
  ).wait();

  let paymasterBalance = await provider.getBalance(paymaster.address);
  console.log(`Paymaster balance is now ${ethers.utils.formatEther(paymasterBalance)} ETH`);

  if (env != "local") {
    // Verify contract programmatically
    //
    // Contract MUST be fully qualified name (e.g. path/sourceName:contractName)
    const contractFullyQualifedName = "contracts/NftGatedPaymaster.sol:NftGatedPaymaster";
    const verificationId = await hre.run("verify:verify", {
      address: paymaster.address,
      contract: contractFullyQualifedName,
      constructorArguments: [NFT_COLLECTION_ADDRESS],
      bytecode: paymasterArtifact.bytecode,
    });

    console.log(
      `${contractFullyQualifedName} verified! VerificationId: ${verificationId}`,
      );
  }

  console.log(`Done!`);
}