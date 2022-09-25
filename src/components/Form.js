import React, { useState } from "react";
import axios from "axios";
import { tokensState } from "./state.js";
import { useRecoilState } from "recoil";

function Form() {
  const [name, setName] = useState("");
  const [amount_invested, setAmountInvested] = useState("");
  const [price_at_purchase, setPriceAtPurchase] = useState("");
  const [date_purchased, setDatePurchased] = useState("");
  const [tokens_owned, setTokensOwned] = useState("");
  // eslint - disable - next - line;
  const [coins, setCoins] = useRecoilState(tokensState);

  const updateTokensOwned = (event) => {
    setTokensOwned(event.target.value);
  };

  const updateDatePurchased = (event) => {
    setDatePurchased(event.target.value);
  };

  const updatePriceAtPurchase = (event) => {
    setPriceAtPurchase(event.target.value);
  };

  const updateAmountInvested = (event) => {
    setAmountInvested(event.target.value);
  };

  const updateName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      url: "http://localhost:10000/api/crypto",
      method: "Post",
      data: {
        name,
        amount_invested,
        price_at_purchase,
        date_purchased,
        tokens_owned,
      },
    }).then((res) => {
      setCoins([res]);
    });
    console.log("handlesubmit");
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            name="name"
            type="text"
            className="crypto"
            onChange={updateName}
            required="required"
            placeholder="Name"
          />
          <input
            name="usdInvested"
            type="text"
            className="crypto"
            onChange={updateAmountInvested}
            required="required"
            placeholder="USD Invested"
          />
          <input
            name="priceAtPurchase"
            type="text"
            className="crypto"
            onChange={updatePriceAtPurchase}
            required="required"
            placeholder="Price At Purchase"
          />
          <input
            name="tokenAmount"
            type="text"
            className="crypto"
            onChange={updateTokensOwned}
            required="required"
            placeholder="Token Amount"
          />
          <input
            name="date"
            type="text"
            className="crypto"
            onChange={updateDatePurchased}
            required="required"
            placeholder="MM-DD-YYYY"
          />
          <button type="submit" id="submit">
            Submit
          </button>
        </label>
      </form>
    </div>
  );
}

export default Form;
