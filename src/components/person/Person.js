import React, { useEffect, useState } from "react";

import "./person.scss";

function Person({ personId, setPersonId, refPerson }) {
  const [person, setPerson] = useState({});
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${personId}`)
      .then((response) => response.json())
      .then((data) => setPerson(data));
  }, []);
  return (
    <div className="person">
      <div className="person__content" ref={refPerson}>
        <img className="person__image" src={person.image} />
        <button
          className="person__close"
          onClick={() => {
            setPersonId(0);
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 8L8 24"
              stroke="#31445F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 8L24 24"
              stroke="#31445F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span>
          Full Name : {person.firstName} {person.lastName}
        </span>
        <span>
          Address : {person.address?.address} {person.address?.state}
        </span>
        <span>Age : {person.age}</span>
        <span>Height : {person.height}</span>
        <span>Weight : {person.weight}</span>
        <span>Number : {person.phone}</span>
        <span>Email: {person.email}</span>
      </div>
    </div>
  );
}

export default Person;
