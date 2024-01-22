import React, { useEffect, useState } from "react";
import Student from "../components/ownClass/student/Student";
import { Link, json, useParams } from "react-router-dom";
import StudentsMarks from "./StudentsMarks";
import "./AddActivity.css";
// import  useParams  from "react-router-dom";

const AddActivity = () => {
  let { version, category, main_department, standard, form } = useParams();
  // console.log(version, category, main_department,standard, form );
  // const form = localStorage.getItem("form");

  // const category = localStorage.getItem("category");
  // const version = localStorage.getItem("version");
  // const main_department = localStorage.getItem("main_department");
  // const standard = localStorage.getItem("standard");
  const [students, setStudents] = useState([]);
  const [cqMarks, setCqMarks] = useState([]);
  const [mcqMarks, setMcqMarks] = useState([]);
  const [cqGpa, setCqGpa] = useState([]);
  const [mcqGpa, setMcqGpa] = useState([]);
  const [exmType, setExmType] = useState("");
  const [mcq, setMcq] = useState(0);
  const [cq, setCq] = useState(0);

  const check = localStorage.getItem("isLogged");
  // console.log(check);
  const [isLogged, setIsLogged] = useState(check);
  const settingExmType = (e) => {
    setExmType(e.target.value);
  };
  // const settingIsMcq =()=>{
  //   setIsMcq(!isMcq)

  // }
  // const settingIsCq =()=>{
  //   setIsCq(!isCq)

  // }
  useEffect(() => {
    if (isLogged) {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/students/${main_department}/${standard}/${version}/${form}/${category}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle fetched data (e.g., update state or display it)
          // console.log(data);
          setStudents(data);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
      document.getElementById("exmUpdate").style.display = "block";
      document.getElementById("loginMsg").style.display = "none";
    } else {
      document.getElementById("exmUpdate").style.display = "none";
      document.getElementById("loginMsg").style.display = "block";
    }
  }, []);
  let studentsCode = [];
  // let marks = []
  for (let i = 0; i < students.length; i++) {
    studentsCode.push(students[i]._id.id);
  }
  // console.log(studentsCode);

  const getCq = (data) => {
    let newMarks = cqMarks;
    let newGpa = cqGpa;
    newMarks[studentsCode.indexOf(data.code)] = data.value;
    setCqMarks(newMarks);

    newGpa[studentsCode.indexOf(data.code)] = data.gpa;
    setCqGpa(newGpa);
  };
  const getMcq = (data) => {
    let newGpa = mcqMarks;
    let newMarks = mcqGpa;
    newMarks[studentsCode.indexOf(data.code)] = data.value;
    setMcqMarks(newMarks);
    newGpa[studentsCode.indexOf(data.code)] = data.gpa;
    setMcqGpa(newGpa);
  };

  const handleSetCqMarks = (e) => {
    if (e.target.value === "") {
      setCq(0);
    } else {
      setCq(e.target.value);
    }
  };
  const handleSetMcqMarks = (e) => {
    if (e.target.value === "") {
      setMcq(0);
    } else {
      setMcq(e.target.value);
    }
  };

  const handleSubmit = () => {
    const exmData = {
      // exmType: exmType, studentsCode : studentsCode, cq_marks:cqMarks,mcq_marks:mcqMarks,
      exmType,
      studentsCode,
      cqMarks,
      cqGpa,
      mcqMarks,
      mcqGpa,
    };
    console.log(exmData);
    alert(JSON.stringify(exmData));
  };
  // console.log(document.getElementsByName("mcq"));

  return (
    <div>
      <h1>Update Exam Result</h1>
      <div id="exmUpdate">
        <div>
          <h3>Select Exam Type: {exmType}</h3>
          <button
            onClick={settingExmType}
            value={"monthly"}
            className="btn-Acc"
          >
            Monthly
          </button>
          <button onClick={settingExmType} value={"weekly"} className="btn-Acc">
            Weekly
          </button>
          <button
            onClick={settingExmType}
            value={"half yearly"}
            className="btn-Acc"
          >
            Half Yearly
          </button>
          <button onClick={settingExmType} value={"yearly"} className="btn-Acc">
            Yearly
          </button>
          <div></div>
        </div>
        {/* <div>


          <tr>
              <td>Cq</td>
              <td> <button onClick={settingIsCq} className="btn-Acc">Set</button></td>
              <td>{isCq}</td>
            </tr>
            <tr>
              <td>Mcq</td>
              <td> <button  onClick={settingIsMcq} className="btn-Acc">Set</button></td>
              <td>{isMcq}</td>
            </tr>
           
           

          </div> */}
        <div className="in-left">
          <tr className="SMU-student-row">
            <td className="leftByF" className="SMU-student-code">
              Total C.Q Marks :
            </td>
            <td className="SMU-student-code">
              <input
                className="input-cell"
                onChange={handleSetCqMarks}
                type="number"
                placeholder="Total C.Q Marks :"
              />
            </td>
            <td className="SMU-student-code">{cq}</td>
          </tr>
          <tr className="SMU-student-row">
            <td className="leftByF" className="SMU-student-code">
              Total M.C.Q Marks :
            </td>
            <td className="SMU-student-code">
              <input
                className="input-cell"
                onChange={handleSetMcqMarks}
                type="number"
                placeholder="Total M.C.Q Marks"
              />
            </td>
            <td className="SMU-student-code">{mcq}</td>
          </tr>
        </div>

        <tr className="Hide-on-600">
          <th>I.D NO. </th>
          <th>Name </th>
          <th>CQ-Marks </th>
          <th>MCQ-Marks </th>
          <th>CQ-GPA </th>
          <th>MCQ-GPA </th>
        </tr>

        {students.map((student) => (
          <StudentsMarks
            gettingCq={getCq}
            gettingMcq={getMcq}
            key={student._id.id}
            student={student}
            cq={cq}
            mcq={mcq}
          ></StudentsMarks>
        ))}
        <button className="btn btn-Acc-sign_up" onClick={handleSubmit}>
          Submit
        </button>
        <Link className="btn-link" to="/activity">
          <button className="home-button">Back</button>
        </Link>
      </div>
      <div id="loginMsg">
        <h1> log in first</h1>
        <Link className="btn-link" to="/">
          <button className="home-button">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default AddActivity;
