import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header.js";
import PoolStats from "./components/TransferCard.js";
import Transferout from "./components/TransferCardout.js";

import Poolbutton from "./components/Poolbutton.js";
import Web3 from "web3";
import ConnectWallet from "./components/Connectwallet.js";
import qr from "./qr.png";

const web3 = new Web3(Web3.givenProvider);

function App() {
  const ethereum = window.ethereum;

  const [addr, setAddr] = useState("");
  const [fundingScreen, setFundingScreen] = useState(1);
  const [progressBar, setProgressBar] = useState("1");
  const [progress, setProgress] = useState("1");
  checkProgress();

  async function getAccount() {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setAddr(account);
  }
  function changeScreen(number) {
    setFundingScreen(number);
  }
  function checkProgress() {
    fetch(
      "http://api.nanoissuperior.co.uk:4200/proxy/?action=account_balance&account=nano_374ebdxydfbdngnr6hibbs8mms7zs5t656pd5yjc7fsewp1n77dn8t75zkbd"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          checkPercentage(
            (parseInt(result.balance) + parseInt(result.pending)) /
              1000000000000000000000000000000
          );
          setProgress(
            (parseInt(result.balance) + parseInt(result.pending)) /
              1000000000000000000000000000000
          );
        },

        (error) => {
          console.log(error);
        }
      );
  }
  function viewInterface() {
    let width = window.innerWidth;
    if (width > 700) {
      return (
        <div
          onClick={() => changeScreen(2)}
          id="seeinter"
          className="container"
        >
          <a id="joinpool">View the interface</a>
        </div>
      );
    }
  }
  async function checkPercentage(Number) {
    let A = Number;
    const B = 5000;
    if (A < 100) {
      A = 100;
    } else {
      A = A;
    }

    const percDiff = (A / B) * 100;
    setProgressBar(percDiff.toString());
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

  if (fundingScreen === 1) {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <body className="bodyfund">
          {" "}
          <p id="fundingtext"> Our funding goal is:</p>
          <h1 id="amount">5,000 Nano</h1>
          <div className="container6">
            <div className="meter">
              <span style={{ width: `${progressBar}%` }}></span>
            </div>
          </div>
          <p>Currently we are at {Math.round(progress * 100) / 100} Nano</p>
          <div id="fund" onClick={() => changeScreen(3)} className="container">
            <a>Fund</a>
          </div>
          {viewInterface()}
        </body>
      </div>
    );
  } else if (fundingScreen === 2) {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <ConnectWallet getAccount={() => getAccount()} addr={addr} />
        <body className="bodydapp">
          <p>
            Use this as a bridge for moving Nano to and from ethereum in the
            form of WNANO.
          </p>
          <PoolStats />
        </body>
        <div
          onClick={() => changeScreen(1)}
          id="seeinter"
          className="container"
        >
          <a id="joinpool">Fund the project</a>
        </div>
      </div>
    );
  } else if (fundingScreen === 3) {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <body className="bodyfund">
          <img id="qrcode" src={qr} />
          <div
            id="fund"
            onClick={() => {
              navigator.clipboard.writeText(
                "nano_374ebdxydfbdngnr6hibbs8mms7zs5t656pd5yjc7fsewp1n77dn8t75zkbd"
              );
            }}
            className="container"
          >
            <a>Copy address 📋</a>
          </div>

          <div id="fund" onClick={() => changeScreen(1)} className="container">
            <a>Back</a>
          </div>
          {viewInterface()}
        </body>
      </div>
    );
  }
}

export default App;
