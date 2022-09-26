import React, { useState, useEffect, Fragment } from "react";
import { tokensState } from "./state.js";
import { useRecoilState } from "recoil";
import ReadOnly from "./ReadOnly.js";
import { Edit } from "./Edit.js";
import axios from "axios";

function ShowPortfolio() {
  const [investments, setInvestments] = useState([]);
  const [tokens, setTokens] = useRecoilState(tokensState);

  const [editInvestmentId, setEditInvestmentId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    amount_invested: "",
    price_at_purchase: "",
    date_purchased: "",
    tokens_owned: "",
  });

  useEffect(() => {
    fetch("https://crypto-tracker-5xpa.onrender.com/api/crypto", {
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInvestments(data);
      });
  }, [tokens, editFormData]);

  const deleteBtn = (event) => {
    event.preventDefault();
    let id = event.currentTarget.id;
    console.log(id);
    fetch(`https://crypto-tracker-5xpa.onrender.com//api/crypto/${id}`, {
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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedInvestment = {
      id: editInvestmentId,
      name: editFormData.name,
      amount_invested: editFormData.amount_invested,
      price_at_purchase: editFormData.price_at_purchase,
      date_purchased: editFormData.date_purchased,
      tokens_owned: editFormData.tokens_owned,
    };

    axios
      .patch(
        `https://crypto-tracker-5xpa.onrender.com/api/crypto/${editInvestmentId}`,
        editedInvestment
      )
      .then((resp) => {
        const newInvestments = [...investments];
        const index = investments.findIndex(
          (investment) => investment.id === editInvestmentId
        );
        newInvestments[index] = editedInvestment;

        setInvestments(newInvestments);
        setEditInvestmentId(null);
      });
  };

  const handleEditClick = (event, investment) => {
    event.preventDefault();
    setEditInvestmentId(investment.id);

    const formValues = {
      name: investment.name,
      amount_invested: investment.amount_invested,
      price_at_purchase: investment.price_at_purchase,
      date_purchased: investment.date_purchased,
      tokens_owned: investment.tokens_owned,
    };

    setEditFormData(formValues);
  };
  // Good
  const handleCancelClick = () => {
    setEditInvestmentId(null);
  };

  return (
    <>
      <div className="table">
        <form className="form" onSubmit={handleEditFormSubmit}>
          <table key="token">
            <thead>
              <tr key="id">
                <th>Cyptocurrency</th>
                <th>Amount Invested</th>
                <th>Price at Purchase</th>
                <th>Token Amount</th>
                <th>Date of Purchase</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <Fragment>
                  {editInvestmentId === investment.id ? (
                    <Edit
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      investments={investments}
                      setInvestments={setInvestments}
                      setEditFormData={setEditFormData}
                    />
                  ) : (
                    <ReadOnly
                      investment={investment}
                      handleEditClick={handleEditClick}
                      deleteBtn={deleteBtn}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}

export default ShowPortfolio;
