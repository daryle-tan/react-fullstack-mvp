import React from "react";
// import { tokenState } from "./state.js";
// import { useRecoilState } from "recoil";

export const Edit = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  setEditFormData,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="name"
          name="name"
          onChange={handleEditFormChange}
          value={editFormData.name}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="amount-invested"
          name="amount_invested"
          onChange={handleEditFormChange}
          value={editFormData.amount_invested}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="price-at-purchase"
          name="price_at_purchase"
          onChange={handleEditFormChange}
          value={editFormData.price_at_purchase}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="token-amount"
          name="tokens_owned"
          onChange={handleEditFormChange}
          value={editFormData.tokens_owned}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="date-of-purchase"
          name="date_purchased"
          onChange={handleEditFormChange}
          value={editFormData.date_purchased}
        />
      </td>
      <td className="actions">
        <button type="submit" className="button">
          Save
        </button>
        <button type="button" className="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

// event.preventDefault();
// fetch(`http://localhost:3000/api/crypto/${id}`, {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(editFormData),
// })
//   .then((resp) => resp.json())
//   .then((editFormData) => {
//     handleEditFormChange(editFormData);
//   });
