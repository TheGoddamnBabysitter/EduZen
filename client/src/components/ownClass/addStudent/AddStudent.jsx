import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  // const [cls, setClass] = useState("");
  // const [version, setVersion] = useState("");
  const version = localStorage.getItem("version");
  const main_department = localStorage.getItem("main_department");
  const group = localStorage.getItem("main_department");
  const cls = localStorage.getItem("standard");
  // const [group, setGroup] = useState("");
  const [sessionStart, setSessionStart] = useState("");
  const [sessionEnd, setSessionEnd] = useState("");
  const [phone, setPhone] = useState("");
  // const main_department = localStorage.getItem("main_department");
  const campus = localStorage.getItem("campus");
  const category = localStorage.getItem("category");
  const form = localStorage.getItem("form");

  const handleChange = (event) => {
    console.log(event.target.name);
    if (event.target.name === "firstName") {
      setFirstName(event.target.value);
    } else if (event.target.name === "lastName") {
      setLastName(event.target.value);
    } else if (event.target.name === "id") {
      setId(event.target.value);
    } else if (event.target.name === "sessionStart") {
      setSessionStart(event.target.value);
    } else if (event.target.name === "sessionEnd") {
      setSessionEnd(event.target.value);
    } else if (event.target.name === "phone") {
      setPhone(event.target.value);
    }
  };

  const handleSubmit = async () => {
    const setStudents = {
      _id: { id: `${id}` },
      name: `${firstName} ${lastName}`,
      class: `${cls}`,
      medium: `${version}`,
      group: `${group}`,
      session: `${sessionStart}&${sessionEnd}`,
      phone: `${phone}`,
    };
    for (let i = 1; i <= 6; i++) {
      document.getElementById(`${i}`).value = "";
    }
    const previousIds = JSON.parse(localStorage.getItem("collectedId"));

    if (previousIds.indexOf(id) != -1) {
      alert("Students existx with this id");
    } else {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post_students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            setStudents,
            form,
            main_department,
            category,
            cls,
            version,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to post data");
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
          // Display error message to the user
        });
    }
  };

  return (
    <div>
      <div>
        <input
          id="1"
          className="input"
          onChange={handleChange}
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <br />
        <input
          id="2"
          className="input"
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
        <br />
        <input
          id="3"
          className="input"
          onChange={handleChange}
          type="text"
          name="id"
          placeholder="Id"
        />
        <br />

        <input
          id="4"
          className="input"
          onChange={handleChange}
          type="text"
          name="sessionStart"
          placeholder="session Start"
        />
        <br />
        <input
          id="5"
          className="input"
          onChange={handleChange}
          type="text"
          name="sessionEnd"
          placeholder="session End"
        />
        <br />
        <input
          id="6"
          className="input"
          onChange={handleChange}
          type="text"
          name="phone"
          placeholder="Phone"
        />
        <br />
      </div>
      <button className="btn btn-Add" onClick={handleSubmit}>
        Add Student{" "}
      </button>
      <Link className="btn btn-link" to="/ownClass">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default AddStudent;
