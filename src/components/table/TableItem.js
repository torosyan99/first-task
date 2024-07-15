import React from "react";

function TableItem({ fullName = "", age = "", gender = "", address = "" }) {
  return (
    <tr>
      <td>{fullName}</td>
      <td>{age}</td>
      <td>{gender}</td>
      <td>{address}</td>
    </tr>
  );
}

export default TableItem;
