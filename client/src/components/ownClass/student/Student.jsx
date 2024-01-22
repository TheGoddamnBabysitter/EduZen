import React, { useState } from "react";
import "./student.css";
const Student = (props) => {
  const main_department = localStorage.getItem("main_department");
  const version = localStorage.getItem("version");

  const category = localStorage.getItem("category");
  const form = localStorage.getItem("form");
  const cls = localStorage.getItem("standard");

  const student = props.student;
  let code = student._id.id;
  let phone = student.phone;
  let name = student.name;
  // console.log(student);
  const [isPresent, setIsPresent] = useState("");

  const deleteID = async () => {
    console.log(props);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/delete_students`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form,
          main_department,
          category,
          cls,
          version,
          code,
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
        console.log(result.message);
        //  setDeleted(result.code)
        props.getDeleted(result.code);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        // Display error message to the user
      });
  };

  const handleToggle = (e) => {
    if (e.target.value === "0") {
      const element = document.querySelectorAll(`.isPresent${code}`);
      element[0].innerText = "Present";
      // setIsPresent("Present")
      props.onReceiveData({ code, presence: "present", phone, name });
    } else if (e.target.value === "1") {
      const element = document.querySelectorAll(`.isPresent${code}`);
      element[0].innerText = "Absent";
      // setIsPresent("Absent")
      props.onReceiveData({ code, presence: "absent", phone, name });
    } else if (e.target.value === "2") {
      const element = document.querySelectorAll(`.isPresent${code}`);
      element[0].innerText = "Late";
      // setIsPresent("Late")
      props.onReceiveData({ code, presence: "late", phone, name });
    }
  };

  return (
    <tr key={code} className="student-row">
      <td>
        <button className="delete-button" onClick={deleteID}>
          Delete
        </button>
      </td>
      <td className="student-code">{`${code}`}</td>
      <td className="student-name">{student.name}</td>
      <td className="attendance-button-container">
        <button
          name="presentBtn"
          value={0}
          className="present-button"
          onClick={handleToggle}
        >
          Present
        </button>
      </td>
      <td className="attendance-button-container">
        <button
          name="absentBtn"
          value={1}
          className="absent-button"
          onClick={handleToggle}
        >
          Absent
        </button>
      </td>
      <td className="attendance-button-container">
        <button
          name="lateBtn"
          value={2}
          className="absent-button"
          onClick={handleToggle}
        >
          Late
        </button>
      </td>

      <td className={`isPresent${code} isPresent attendance-status`}>
        {isPresent}
      </td>
    </tr>
  );
};

export default Student;
