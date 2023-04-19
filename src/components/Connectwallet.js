import React, { useState, useCallback } from "react";
import "./Connectwallet.css";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

export default class ConnectedWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (typeof window.ethereum !== "undefined") {
      if (this.props.addr !== "") {
        return (
          <div
            id="ConnectedWallet"
            className="container"
            onClick={this.props.getAccount}
          >
            <a>{this.props.addr}</a>
          </div>
        );
      } else {
        return (
          <div
            id="ConnectWallet"
            className="container"
            onClick={this.props.getAccount}
          >
            <a>Connect</a>
          </div>
        );
      }
    } else {
      return (
        <div id="ConnectWallet" className="container">
          <a>Install metamask</a>
        </div>
      );
    }
  }
}
