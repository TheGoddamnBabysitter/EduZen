import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PastStudent from "./PastStudent";
import DatePicker from "../DatePicker/DatePicker";
import "./pastAtt.css";

const PastAttendence = () => {
  const [digit, setDigit] = useState(0);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState(new Date());
  const [collectedArrey, setCollectedArrey] = useState([]);

  const handleChange = (e) => {
    if (e.target.name == "year") {
      setYear(e.target.value);
    } else if (e.target.name == "month") {
      setMonth(e.target.value);
    } else if (e.target.name == "date") {
      setDate(e.target.value);
    }
  };

  const form = localStorage.getItem("form");

  const category = localStorage.getItem("category");
  const version = localStorage.getItem("version");
  const main_department = localStorage.getItem("main_department");
  const standard = localStorage.getItem("standard");

  const getPastAttendence = () => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/${main_department}/${standard}/${version}/${form}/${category}/${year}/${month}/${date}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle fetched data (e.g., update state or display it)
        console.log(data[0].dataArrey);
        setCollectedArrey(data[0].dataArrey);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };
  //   useEffect(() => {
  //     getPastAttendence();
  //   }, []);
  return (
    <div>
      {/* <h2 className="text-3xl mb-5">Past Attendence</h2>
      <DatePicker date={data} onDateChange={setData} /> */}
      {/*
      <Link to="/ownclass">
        <button>Own Class</button>
      </Link>
      <br />
      <br />

      <div>
        <label htmlFor="year">Year:{`(${year})`}</label>{" "}
        <input type="number" id="year" name="year" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="month">Month:{`(${month})`}</label>{" "}
        <input type="text" id="month" name="month" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="date">Date:{`(${date})`}</label>{" "}
        <input type="number" id="date" name="date" onChange={handleChange} />
        <br />
        <br />
        <button onClick={getPastAttendence}>PastAttendence</button>
      </div>
      <br />
      <table>
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
      </table>*/}
      <div className="attendance-container">
        <Link className="class-link" to="/ownclass">
          <button className="btn class-button">Own Class</button>
        </Link>
        <div className="input-container">
          <label htmlFor="year" className="input-label">
            Year:{`(${year})`}
          </label>
          <input
            type="number"
            id="year"
            name="year"
            className="input-field"
            onChange={handleChange}
            placeholder="Year"
          />

          <label htmlFor="month" className="input-label">
            Month:{`(${month})`}
          </label>
          <input
            type="text"
            id="month"
            name="month"
            className="input-field"
            onChange={handleChange}
            placeholder="Month"
          />

          <label htmlFor="date" className="input-label">
            Date:{`(${date})`}
          </label>
          <input
            type="number"
            id="date"
            name="date"
            className="input-field"
            onChange={handleChange}
            placeholder="Date"
          />

          <button className="btn attendance-button" onClick={getPastAttendence}>
            PastAttendence
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default PastAttendence;
