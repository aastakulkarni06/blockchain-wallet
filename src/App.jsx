import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const userBalance = await provider.getBalance(address);

        setAccount(address);
        setBalance(Number(ethers.formatEther(userBalance)).toFixed(4));
        setStatus('Wallet connected successfully!');
      } catch (err) {
        setStatus('Connection request cancelled.');
      }
    } else {
      alert('Kripya browser me MetaMask extension install karein!');
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!receiver || !amount) {
      alert('Address aur amount dono fill kijiye!');
      return;
    }
    setStatus(`Transaction initiated: ${amount} ETH to ${receiver.slice(0, 6)}...`);
    setReceiver('');
    setAmount('');
  };

  return (
    <div className="wallet-card">
      <h2 className="title">Web3 Crypto Wallet</h2>

      {!account ? (
        <div>
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>
            Apna Web3 wallet connect karke balance dekhein.
          </p>
          <button className="btn" onClick={connectWallet}>
            Connect MetaMask
          </button>
        </div>
      ) : (
        <div>
          <div className="info-box">
            <p><strong>Address:</strong> {account.slice(0, 6)}...{account.slice(-4)}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
          </div>

          <form onSubmit={handleSend} style={{ marginTop: '20px' }}>
            <label style={{ fontSize: '13px', color: '#94a3b8' }}>Recipient Address</label>
            <input
              type="text"
              placeholder="0x..."
              className="input-field"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />

            <label style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginTop: '10px' }}>
              Amount (ETH)
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="0.01"
              className="input-field"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button type="submit" className="btn">
              Send Crypto
            </button>
          </form>
        </div>
      )}

      {status && (
        <p style={{ fontSize: '12px', color: '#38bdf8', textAlign: 'center', marginTop: '12px' }}>
          {status}
        </p>
      )}
    </div>
  );
}

export default App;