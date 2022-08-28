import React, { useState, useEffect } from "react";
import Form from "./Form.js";
import { tokensState } from "./state.js";
import { useRecoilState } from "recoil";
// import { forms } from "./Form.js";

function ShowPortfolio() {
  const [investments, setInvestments] = useState([]);
  const [tokens, setTokens] = useRecoilState(tokensState);
  useEffect(() => {
    fetch("http://localhost:3000/api/crypto", {
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInvestments(data);
        console.log(data);
      });
  }, [tokens]);

  const deleteBtn = (event) => {
    event.preventDefault();
    let id = event.currentTarget.id;
    fetch(`http://localhost:3000/api/crypto/${id}`, {
      method: "DELETE",
    }).then(() => {
      setInvestments({ id: 0 });
      setTokens({ tokensState });
    });
    console.log(tokens);
  };

  if (investments.id === 0) {
    return null;
  }

  return (
    <>
      <Form className="form" />
      <div className="table">
        <table key="token">
          <thead>
            <tr>
              <th>Cyptocurrency</th>
              <th>Amount Invested</th>
              <th>Price at Purchase</th>
              <th>Token Amount</th>
              <th>Date of Purchase</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => {
              return (
                // <table key="name">
                // <tbody>
                <tr key={investment.id}>
                  <td key="name" value={investment.name}>
                    {investment.name}
                  </td>
                  <td key="amountInvested" value={investment.amount_invested}>
                    {investment.amount_invested}
                  </td>
                  <td
                    key="priceAtPurchase"
                    value={investment.price_at_purchase}
                  >
                    {investment.price_at_purchase}
                  </td>
                  <td key="amount" value={investment.tokens_owned}>
                    {investment.tokens_owned}
                  </td>
                  <td key="datePurchased" value={investment.date_purchased}>
                    {investment.date_purchased}
                  </td>
                  <td>
                    <button
                      id={investment.id}
                      onClick={deleteBtn}
                      className="deleteBtn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                // </tbody>
                // </table>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowPortfolio;
