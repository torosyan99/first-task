import React from "react";

function TableItem({
  fullName = "",
  age = "",
  gender = "",
  address = "",
  onClick = () => {},
}) {
  return (
    <tr className="table__item" onClick={onClick}>
      <td>{fullName}</td>
      <td>{age}</td>
      <td>{gender}</td>
      <td>{address}</td>
    </tr>
  );
}

export default TableItem;
