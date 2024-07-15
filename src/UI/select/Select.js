import React, { useCallback, useEffect, useRef, useState } from "react";

import "./select.scss";

function Select({ selectKey = "", list = [], set = () => {} }) {
  const [bool, setBool] = useState(false);
  const listClass = bool ? "select__list select__list--active" : "select__list";
  const ref = useRef();
  const showList = useCallback(({ target }) => {
    if (target === ref.current) setBool(!bool);
    else if (bool) setBool(false);
  });

  useEffect(() => {
    document.body.addEventListener("click", showList);
  });
  return (
    <div className="select">
      <button className={"select__button"} ref={ref} type="button">
        <span>{selectKey}</span>
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.2856 10L10.2856 14L6.28564 10"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul className={listClass}>
        {list.map((listKey) => {
          if (listKey == selectKey) return;
          return (
            <li key={listKey} className="select__item">
              <button
                className="select__list-button"
                type="button"
                onClick={() => {
                  const finalKey = list.includes("Male")
                    ? listKey.toLowerCase()
                    : listKey;
                  set(finalKey);
                  setBool(false);
                }}
              >
                {listKey}
              </button>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Select;
