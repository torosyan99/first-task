import React from "react";
import TableItem from "./TableItem";
import {  useSelector } from "react-redux";

import "./table.scss";

function Table() {
  const table = useSelector((state) => state.table);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Возраст</th>
          <th>Пол</th>
          <th>Адрес</th>
        </tr>
      </thead>
      <tbody>
        {table.map((user) => {
          const fullName = `${user.firstName} ${user.lastName}`;
          const address = `${user.address.address} ${user.address.state} ${user.address.city}`;
          return (
            <TableItem
              key={user.id}
              fullName={fullName}
              address={address}
              age={user.age}
              gender={user.gender}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
