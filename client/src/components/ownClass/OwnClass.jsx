import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import CurrentDate from "./date/CurrentDate";
import Student from "./student/Student";
import "./OwnClass.css";
import PastStudent from "../past-attendence/PastStudent";
import PastStudentsLate from "../past-attendence/PastStudentsLate";
const OwnClass = () => {
  const form = localStorage.getItem("form");

  const category = localStorage.getItem("category");
  const version = localStorage.getItem("version");
  const main_department = localStorage.getItem("main_department");
  const campus = localStorage.getItem("campus");
  const standard = localStorage.getItem("standard");
  // const students = useLoaderData()
  const [deleted, setDeleted] = useState("");
  const [students, setStudents] = useState([]);
  const [msg, setMsg] = useState("");

  // const [collectedIds , setCollectedIds] = useState([])

  const [collectedArrey, setCollectedArrey] = useState([]);
  useEffect(() => {
    const currentDateSet = new Date();
    const formattedDate = currentDateSet.getDate();
    const formattedDay = weekdays[currentDateSet.getDay()];
    const year = currentDateSet.getFullYear();
    const formatedMonth = monthsFull[currentDateSet.getMonth()];
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/${main_department}/${standard}/${version}/${form}/${category}/${year}/${formatedMonth}/${formattedDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle fetched data (e.g., update state or display it)
        const empty = data[0] === null;
        if (!empty) {
          console.log("you are already done");
          setCollectedArrey(data[0].dataArrey);
          document.getElementById("attendance-tableid").style.display = "block";
          document.getElementById("student-tableid").style.display = "none";
        } else if (empty) {
          fetch(
            `${
              import.meta.env.VITE_API_URL
            }/students/${main_department}/${standard}/${version}/${form}/${category}`
          )
            .then((response) => response.json())
            .then((data) => {
              // Handle fetched data (e.g., update state or display it)
              console.log(data);
              setStudents(data);
              const collectedStudents = [];
              for (let i = 0; i < data.length; i++) {
                // console.log(data[i]._id.id);
                collectedStudents.push(data[i]._id.id);
              }
              localStorage.setItem(
                "collectedId",
                JSON.stringify(collectedStudents)
              );
            })
            .catch((error) => {
              // Handle errors
              console.error(error);
            });
          document.getElementById("attendance-tableid").style.display = "none";
          document.getElementById("student-tableid").style.display = "block";
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }, [deleted, msg]);

  const deleteSheet = async () => {
    const currentDateSet = new Date();
    const date = currentDateSet.getDate();
    const formattedDay = weekdays[currentDateSet.getDay()];
    const year = currentDateSet.getFullYear();
    const month = monthsFull[currentDateSet.getMonth()];

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/delete_sheet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          main_department,
          standard,
          version,
          category,
          form,
          year,
          month,
          date,
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
        setMsg(result.message);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        // Display error message to the user
      });
  };

  const getDeleted = (code) => {
    setDeleted(code);
  };
  // const getStudents = () => {
  //   fetch(
  //     `${import.meta.env.VITE_API_URL}/students/${main_department}/${standard}/${version}/${form}/${category}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle fetched data (e.g., update state or display it)
  //       console.log(data);
  //       setStudents(data);
  //       const collectedStudents = [];
  //       for (let i = 0; i < data.length; i++) {
  //         // console.log(data[i]._id.id);
  //         collectedStudents.push(data[i]._id.id);
  //       }
  //       localStorage.setItem("collectedId", JSON.stringify(collectedStudents));
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error(error);
  //     });
  // };
  // useEffect(() => {
  //   getStudents();
  // }, [deleted]);

  const department = localStorage.getItem("department");
  const code = localStorage.getItem("code");

  // const form = localStorage.getItem( "form" );
  // const category =  localStorage.getItem( "category");
  // const version = localStorage.getItem( "version");
  // const main_department = localStorage.getItem( "main_department" );
  // const campus = localStorage.getItem( "campus");
  // const standard=localStorage.getItem( "standard");

  // console.log(students[0]._id.id);

  const [codeSheet, setCodeSheet] = useState([]);
  const [presenceSheet, setPresenceSheet] = useState([]);
  const [nameSheet, setNameSheet] = useState([]);
  const [time, setTime] = useState("");

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthsFull = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDataReceived = (childData) => {
    if (codeSheet.indexOf(childData.code) === -1) {
      setCodeSheet([...codeSheet, childData.code]);
      setPresenceSheet([...presenceSheet, childData]);
    } else {
      let set = [...presenceSheet];
      set[codeSheet.indexOf(childData.code)] = childData;
      setPresenceSheet(set);
    }
    console.log(presenceSheet);
  };
  const handleSave = async () => {
    const currentDateSet = new Date();
    const formattedTime = currentDateSet.toLocaleTimeString();
    const timeParts = formattedTime.split(":");
    const timeHour = formattedTime.split(":")[0];
    const timeMunite = formattedTime.split(":")[1];

    const day_night = timeParts[2].split(" ")[1];

    const formattedDate = currentDateSet.getDate();
    const formattedDay = weekdays[currentDateSet.getDay()];
    const year = currentDateSet.getFullYear();
    const formatedMonth = monthsFull[currentDateSet.getMonth()];

    const timeSet = { formattedDay, formattedDate, formatedMonth, year };
    console.log(timeSet);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/save-presenceSheet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presenceSheet,
          timeSet,
          main_department,
          standard,
          version,
          category,
          form,
        }),
      }
    );
  };
  const handleSubmit = async () => {
    const currentDateSet = new Date();
    const formattedTime = currentDateSet.toLocaleTimeString();
    const timeParts = formattedTime.split(":");
    const timeHour = formattedTime.split(":")[0];
    const timeMunite = formattedTime.split(":")[1];

    const day_night = timeParts[2].split(" ")[1];

    const formattedDate = currentDateSet.getDate();
    const formattedDay = weekdays[currentDateSet.getDay()];
    const year = currentDateSet.getFullYear();
    const formatedMonth = monthsFull[currentDateSet.getMonth()];

    const timeSet = { formattedDay, formattedDate, formatedMonth, year };
    console.log(timeSet);

    if (timeHour >= "0") {
      const elements = document.querySelectorAll(".isPresent");
      elements.forEach((element) => {
        element.innerText = "";
        event.preventDefault();

        // const form= event.target;
        // const price = form.price.value;
      });
      console.log(elements);

      handleSave();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/send-sms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presenceSheet,
          timeSet,
          main_department,
          standard,
          version,
          category,
          form,
        }),
      });

      const data = await response.json();

      if (data.message === "Bulk SMS sent successfully") {
        alert("Bulk SMS sent successfully!");
        setMsg(data.message);
      } else {
        const errors = data.results.map((result) => result.message);
        alert(`Error sending bulk SMS: ${errors.join(", ")}`);
      }
      setPresenceSheet([]);
    } else {
      alert("time dekh bolod!");
    }
  };

  return (
    <div>
      {/* {
        presenceSheet.map( data => <h1 key={data.code}>{`${data.code}: ${data.presence}`}</h1>)
      } */}
      <h3 className="text-3xl">
        {main_department} {form}-{category} {version}
      </h3>
      <CurrentDate></CurrentDate>
      {/**/}
      <div id="attendance-tableid">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Presence</th>
            </tr>
          </thead>
          <tbody id="table">
            {collectedArrey.map((data) => (
              <PastStudent key={data.code} data={data}></PastStudent>
            ))}
          </tbody>
        </table>
        <button onClick={deleteSheet} className="btn btn-Acc">
          re-inter
        </button>
      </div>
      <div id="student-tableid">
        <table className="student-table">
          <thead>
            <tr>
              <th>Delete</th>
              <th>I.D NO.</th>
              <th>Name</th>
              <th>Present</th>
              <th>Abcent</th>
              <th>Late</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody id="table">
            {students.map((student) => (
              <Student
                getDeleted={getDeleted}
                key={student._id.id}
                student={student}
                onReceiveData={handleDataReceived}
              ></Student>
            ))}
          </tbody>
          {/*
        <tbody id="table">
          {students.map((student) => (
            <tr>
              <th>
                <button onClick={() => getDeleted(student._id.id)}>
                  Delete
                </button>
              </th>
              <th>{student._id.id}</th>
              <th>{student.name}</th>
              <th>
                <button onClick={() => handlePresence(student._id.id, true)}>
                  Present
                </button>
              </th>
              <th>
                <button onClick={() => handlePresence(student._id.id, false)}>
                  Absent
                </button>
              </th>
            </tr>
          ))}
        </tbody>*/}
        </table>
        <button id="subBtn" className="btn btn-Acc" onClick={handleSubmit}>
          submit
        </button>
        <div>
          <Link to="/addStudent">
            <button className="btn btn-Add">Add A Student</button>
          </Link>
        </div>
        <br />
        <br />
      </div>
      <Link to="/past-attendence">
        <button className="btn btn-Past">Past Attendence</button>
      </Link>
      <Link className="btn-link" to="/">
        <button className="btn ">Home</button>
      </Link>
    </div>
  );
};

export default OwnClass;
