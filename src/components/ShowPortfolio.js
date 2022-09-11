import React, { useState, useEffect, Fragment } from "react";
// import Form from "./Form.js";
import { tokensState } from "./state.js";
import { useRecoilState } from "recoil";
import ReadOnly from "./ReadOnly.js";
import { Edit } from "./Edit.js";

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
      // setInvestments({ id: 0 });
      setTokens({ tokensState });
    });
    console.log(tokens);
  };
  if (investments.id === 0) {
    return null;
  }

  const handleEditClick = (event, investment) => {
    event.preventDefault();
    setEditInvestmentId(investment.id);
    const formValues = {
      name: investment.name,
      amount_invested: investment.amount_invested,
      price_at_purchase: investment.price_at_purchase,
      tokens_owned: investment.tokens_owned,
      date_purchased: investment.date_purchased,
    };
    setEditFormData(formValues);
  };

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
      name: editFormData.name,
      amount_invested: editFormData.amount_invested,
      price_at_purchase: editFormData.price_at_purchase,
      tokens_owned: editFormData.tokens_owned,
      date_purchased: editFormData.date_purchased,
    };
    const newInvestments = [...investments];
    const index = investments.findIndex(
      (investment) => investment.id === editInvestmentId
    );

    newInvestments[index] = editedInvestment;

    setInvestments(newInvestments);
    setEditInvestmentId(null);
  };

  return (
    <>
      {/* <Form className="form" /> */}
      <div className="table">
        {/* <form className="form"> */}
        <table key="token" onSubmit={handleEditFormSubmit}>
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
        {/* </form> */}
      </div>
    </>
  );
}

export default ShowPortfolio;

// <table key="name">
// <tbody>
// <tr key={investment.id}>
//   <td key="name" value={investment.name}>
//     {investment.name}
//   </td>
//   <td key="amountInvested" value={investment.amount_invested}>
//     {investment.amount_invested}
//   </td>
//   <td
//     key="priceAtPurchase"
//     value={investment.price_at_purchase}
//   >
//     {investment.price_at_purchase}
//   </td>
//   <td key="amount" value={investment.tokens_owned}>
//     {investment.tokens_owned}
//   </td>
//   <td key="datePurchased" value={investment.date_purchased}>
//     {investment.date_purchased}
//   </td>
//   <td>
//     <button
//       id={investment.id}
//       onClick={deleteBtn}
//       className="deleteBtn"
//     >
//       Delete
//     </button>
//   </td>
// </tr>
// </tbody>
// </table>
