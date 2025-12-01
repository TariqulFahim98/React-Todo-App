// WalletConnect.jsx
import React, { useContext } from "react";
import { useState } from "react";
import { Web3Context } from "../context/Web3Context";

// Fix: Accept 'props' and destructure { setProvider, setSigner }
const WalletConnect = () => {
   
const{account,connectWallet } = useContext(Web3Context);

  return (
    <div>
      {account ? (
        <p className="text-xs text-emerald-700">{`${account.slice(2,7)}...${account.slice(-5)}`}</p>
      ) : (
        <button 
          className="bg-red-600 cursor-pointer rounded-lg px-3 py-2 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white text-s"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;