import React from "react";
import Form from "../form/Form";
import Table from "../table/Table";


function Wrapper() {
  return (
    <div className="wrapper">
      <div className="container">
        <Form />
        <Table />
      </div>
    </div>
  );
}

export default Wrapper;
