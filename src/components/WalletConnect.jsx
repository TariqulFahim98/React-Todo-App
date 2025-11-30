// WalletConnect.jsx
import React from "react";
import { ethers } from "ethers";
import { useState } from "react";

// Fix: Accept 'props' and destructure { setProvider, setSigner }
const WalletConnect = ({ setProvider, setSigner }) => {
  const [account, setAccount] = useState(null);
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        // Use BrowserProvider for modern Ethers.js
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Use the prop function to update the state in App.jsx
        setProvider(provider); 
        
        const signer = await provider.getSigner();
        
        // Use the prop function to update the state in App.jsx
        setSigner(signer); 
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please connect metamask!");
    }
  }

  return (
    // ... rest of the component
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