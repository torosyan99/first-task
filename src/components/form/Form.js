import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterUsers, getUsers } from "../../store/tableSlice";
import Select from "../../UI/select/Select";

import "./form.scss";

function Form() {
  const dispatch = useDispatch();

  const [key, setKey] = useState("First Name");
  const [value, setValue] = useState("");
  const list = ["First Name", "Age", "Gender", "Address"];

  useEffect(() => {
    const res = {
      key: key.charAt(0).toLowerCase() + key.slice(1).replaceAll(" ", ""),
      value,
    };

    if (res.value.length > 0) dispatch(filterUsers(res));
    else dispatch(getUsers());
  }, [value]);

  useEffect(() => {
    setValue("");
  }, [key]);

  return (
    <form className="form">
      <Select list={list} selectKey={key} set={setKey} />
      {key === "Gender" ? (
        <Select list={["Male", "Female"]} set={setValue} selectKey="" />
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
