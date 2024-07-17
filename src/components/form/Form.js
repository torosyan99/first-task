import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterUsers, getUsers } from "../../store/tableSlice";
import Select from "../../UI/select/Select";

import "./form.scss";

function Form() {
  const dispatch = useDispatch();
  const table = useSelector((state) => state.table.receivedData);
  const [key, setKey] = useState("First Name");
  const [value, setValue] = useState("");
  const list = ["First Name", "Age", "Gender", "Address"];

  useEffect(() => {
    const res = {
      key: key.charAt(0).toLowerCase() + key.slice(1).replaceAll(" ", ""),
      value,
    };

    if (!table.length) dispatch(getUsers());
    else dispatch(filterUsers(res));
  }, [value]);

  useEffect(() => {
    setValue("");
  }, [key]);

  return (
    <form className="form">
      <Select list={list} selectKey={key} set={setKey} />
      {key === "Gender" ? (
        <Select list={["Male", "Female"]} set={setValue} selectKey={value} />
      ) : (
        <input
          className="form__input"
          value={value}
          onChange={({ target }) => {
            setValue(target.value);
          }}
        />
      )}
    </form>
  );
}

export default Form;
