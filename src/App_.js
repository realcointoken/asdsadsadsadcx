import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header.js";
import PoolStats from "./components/Poolstats.js";
import EstimatedPoolPrize from "./components/EstimatedPoolPrize.js";
import Poolbutton from "./components/Poolbutton.js";
import Web3 from "web3";
import ConnectWallet from "./components/Connectwallet.js";

const web3 = new Web3(Web3.givenProvider);

function App() {
  const ethereum = window.ethereum;
  const [addr, setAddr] = useState("");

  async function getAccount() {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setAddr(account);
  }
  async function sendTransaction() {
    const ethereum = window.ethereum;
    const params = [
      {
        from: addr,
        to: "null",
        gas: "null", // 30400
        gasPrice: "0x9184e72a000", // 10000000000000
        value: "0x9184e72a", // 2441406250
        data: "null",
      },
    ];
    ethereum
      .request({
        method: "eth_sendTransaction",
        params,
      })
      .then((result) => {
        // The result varies by by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
      })
      .catch((error) => {
        // If the request fails, the Promise will reject with an error.
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <ConnectWallet getAccount={() => getAccount()} addr={addr} />
      <body>
        <p>
          Use this as a bridge for moving Nano to and from ethereum in the form
          of WNANO.
        </p>
        <PoolStats />
      </body>
    </div>
  );
}

export default App;
