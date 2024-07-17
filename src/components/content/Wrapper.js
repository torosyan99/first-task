import React, { useRef, useState } from "react";
import Form from "../form/Form";
import Table from "../table/Table";
import Person from "../person/Person";

import "./wrapper.scss";

function Wrapper() {
  const [personId, setPersonId] = useState(0);
  const ref = useRef()
  return (
    <div className={`wrapper ${personId > 0 && "wrapper--overflow"}`} onClick={({target}) => {
      console.log(target, ref.current)
      if(target !== ref.current && personId > 0) {
        setPersonId(0)
      }
    }}>
      <div className="container">
        <Form />
        <Table setPersonId={setPersonId} />
        {personId > 0 && <Person refPerson={ref} personId={personId} setPersonId={setPersonId} />}
      </div>
    </div>
  );
}

export default Wrapper;
