import React from "react";

export const Edit = (editFormData, handleEditFormChange) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="name"
          name="name"
          // onChange={handleEditFormChange}
          value={editFormData.name}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="amount-invested"
          name="amount-invested"
          // onChange={handleEditFormChange}
          value={editFormData.amount_invested}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="price-at-purchase"
          name="price-at-purchase"
          // onChange={handleEditFormChange}
          value={editFormData.price_at_purchase}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="token-amount"
          name="token-amount"
          // onChange={handleEditFormChange}
          value={editFormData.tokens_owned}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="date-of-purchase"
          name="date-of-purchase"
          // onChange={handleEditFormChange}
          value={editFormData.date_of_purchase}
        />
      </td>
      <td className="actions">
        <button type="submit" className="button">
          Save
        </button>
        <button type="button" className="button">
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
