import React from "react";
import "./TransferCard.css";
import nano from "./nano.png";
import eth from "./eth.png";

export default class Lend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 20,
      minutes: 23,
      hours: 5,
      days: 1,
    };
  }

  render() {
    return (
      <div className="both">
        <div className="container">
          {" "}
          <p>Wnano to Nano</p>
          <div className="container2" id="timeemojidiv">
            <h1 id="timeemoji">
              <img id="eth" src={eth} />

              <img id="nano" src={nano} />
            </h1>
          </div>
          <div className="flexbox">
            <p>Destination address</p>
            <input placeholder="Nano address"></input>
          </div>
          <div className="flexbox">
            <p>Amount</p>
            <input placeholder="Wnano amount"></input>
          </div>
          <div className="container">
            <a id="joinpool">Transfer</a>
          </div>
        </div>
      </div>
    );
  }
}
