// https://biconomy.gitbook.io/sdk/sdk-reference/sending-transactions/gasless-transactions/sending-erc-721-nft-tokens
import { ethers } from "ethers";
import { useState } from "react";
import useBiconomyStore from "../store/useBiconomyStore";


const GasslessStakingTokenTx = () => {
  const [successMsg, setSuccessMsg] = useState<string | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const smartAccountAddress = useBiconomyStore.use.smartAccountAddress();
  const recipientAddress = "0x134A492012E0BFBae90D81A4214fa48DaD69bE33";
  const stakingTokenAddress = "0x3f73371cfa58f338c479928ac7b4327478cb859f";
  const amount = 1000000;

  const transferFromZKPToken = async () => {
    const smartAccount = window.biconomySmartAccount;
    if (!smartAccount) return;

    const stakingTokentransferFromInterface = new ethers.utils.Interface([
      "function transferFrom(address sender, address recipient, uint256 amount)",
    ]);


    // Encode an ERC-721 token transfer to recipient of the specified amount
    const transferFromData = stakingTokentransferFromInterface.encodeFunctionData("transferFrom", [
      smartAccountAddress,
      recipientAddress,
      amount,
    ]);



    const txTransferFrom = {
      to: stakingTokenAddress,
      transferFromData,
    };

    const txTransfer = {
      to: stakingTokenAddress,
      txTransferFrom,
    };

    // Transaction subscription
    smartAccount.on("txHashGenerated", (response: any) => {
      console.log("txHashGenerated event received via emitter", response);
      setSuccessMsg(`Transaction sent: ${response.hash}`);
    });
    smartAccount.on("txMined", (response: any) => {
      console.log("txMined event received via emitter", response);
      setSuccessMsg(`Transaction mined: ${response.hash}`);
    });
    smartAccount.on("error", (response: any) => {
      setErrorMsg(
        `error event received via emitter: ${JSON.stringify(response)}`
      );
    });
    // Sending transaction
    // Gasless

    console.log(txTransfer)
    const txResponse = await smartAccount.sendGaslessTransaction({
      transaction: txTransfer,
    });
    console.log("txResponse", txResponse);
  };

  const transferZKPToken = async () => {
    const smartAccount = window.biconomySmartAccount;
    if (!smartAccount) return;

    const stakingTokenTransferInterface = new ethers.utils.Interface([
      "function transfer(address recipient, uint256 amount)",
    ]);

    // Encode an ERC-721 token transfer to recipient of the specified amount
    const transferData = stakingTokenTransferInterface.encodeFunctionData("transfer", [
      recipientAddress,
      amount,
    ]);

    const txTransferFrom = {
      to: stakingTokenAddress,
      transferData,
    };

    const txTransfer = {
      to: stakingTokenAddress,
      transferData,
    };

    // Transaction subscription
    smartAccount.on("txHashGenerated", (response: any) => {
      console.log("txHashGenerated event received via emitter", response);
      setSuccessMsg(`Transaction sent: ${response.hash}`);
    });
    smartAccount.on("txMined", (response: any) => {
      console.log("txMined event received via emitter", response);
      setSuccessMsg(`Transaction mined: ${response.hash}`);
    });
    smartAccount.on("error", (response: any) => {
      setErrorMsg(
          `error event received via emitter: ${JSON.stringify(response)}`
      );
    });
    // Sending transaction
    // Gasless

    console.log(txTransfer)
    const txResponse = await smartAccount.sendGaslessTransaction({
      transaction: txTransfer,
    });
    console.log("txResponse", txResponse);
  };


  return smartAccountAddress && (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ margin: "auto" }}>
        <button onClick={transferFromZKPToken}>TransferFrom ZKP Token</button>
      </div>
      <div style={{ margin: "auto" }}>
        <button onClick={transferZKPToken}>Transfer ZKP Token</button>
      </div>
      <div style={{ margin: "auto" }}>
        {successMsg && <p>{successMsg}</p>}
        {errorMsg && <p>{errorMsg}</p>}
      </div>
    </div>
  ) || null;
};

export default GasslessStakingTokenTx;
