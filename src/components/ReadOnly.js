import React from "react";

const ReadOnly = ({ investment, deleteBtn, handleEditClick }) => {
  return (
    <tr key={investment.id}>
      <td key="name" value={investment.name}>
        {investment.name}
      </td>
      <td key="amountInvested" value={investment.amount_invested}>
        {investment.amount_invested}
      </td>
      <td key="priceAtPurchase" value={investment.price_at_purchase}>
        {investment.price_at_purchase}
      </td>
      <td key="amount" value={investment.tokens_owned}>
        {investment.tokens_owned}
      </td>
      <td key="datePurchased" value={investment.date_purchased}>
        {investment.date_purchased}
      </td>
      <td className="actions">
        <button
          id="edit"
          type="button"
          className="button"
          onClick={(event) => handleEditClick(event, investment)}
        >
          Edit
        </button>
        <button
          color="red"
          id={investment.id}
          onClick={deleteBtn}
          className="button"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnly;
