import React from "react";
import TableItem from "./TableItem";
import SortButton from "../sortButton/SortButton";
import Error from "../error/Error";
import { useSelector } from "react-redux";
import NoFound from "../noFound/NoFound";

import "./table.scss";

function Table({ setPersonId }) {
  const table = useSelector((state) => state.table);

  if (table.error) return <Error />;

  if (!table.data.length) return <NoFound />;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="table__top-item">
                <span>ФИО</span>
                <SortButton sortKey="firstName" />
              </div>
            </th>
            <th>
              <div className="table__top-item">
                <span>Возраст</span>
                <SortButton sortKey="age" />
              </div>
            </th>
            <th>
              <div className="table__top-item">
                <span>Пол</span>
                <SortButton sortKey="gender" />
              </div>
            </th>
            <th>
              <div className="table__top-item">
                <span>Адрес</span>
                <SortButton sortKey="address" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.data.map((user) => {
            const fullName = `${user.firstName} ${user.lastName}`;
            const address = `${user.address.address} ${user.address.state} ${user.address.city}`;
            return (
              <TableItem
                key={user.id}
                fullName={fullName}
                address={address}
                age={user.age}
                gender={user.gender}
                onClick={() => setPersonId(user.id)}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
