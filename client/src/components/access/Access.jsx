import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Acceess.css";

const Access = (props) => {
  const faculty = ['Science', 'commerce', 'humanities ' ]
  const [facultyNum, setFacultyNum] = useState(0);
  const [campus, setCampus] = useState("");
  const [dep, setDep] = useState("");
  const [code, setCode] = useState("");
   const deps = [
   ['math','physics','chemistry', 'biology'],
   [],
   []
  ]

  const SelectedArrey = deps[facultyNum];
  console.log(SelectedArrey);
const changeFaculty = (e) =>{
    if (e.target.innerText === ">" && facultyNum < 2) {
      setFacultyNum(facultyNum+1)
    } else if(e.target.innerText === "<" && facultyNum >0) {
      setFacultyNum(facultyNum-1)
    }
}

  const settingCampus = (e) => {
    setCampus(e.target.value);
  };

  const settingDep = (e) => {
    setDep(e.target.value);
  };
  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleRedirect = () => {
    //     const collectedDep = document.getElementById("dep").value
    //    localStorage.setItem("dep", collectedDep);
    //     const dep = localStorage.getItem("dep");

    //     const collectedCampus = document.getElementById("campus").value
    //    localStorage.setItem("campus", collectedCampus);
    //     const campus = localStorage.getItem("campus");

    //     const collectedCode = document.getElementById("code").value
    //     setCode(collectedCode)

    //    console.log(dep);
    props.onReceiveData({ campus, dep, code });
    //  console.log(firstName, lastName);
  };

  return (
    <div>
      <div>
      <h1>Welcome to eduzen.</h1>
      <h2>Enter Your Information To Get Acceess .</h2>
        <div>
          <h3> Select a Camupus : {campus}</h3>
          <button
            className="btn-Acc"
            value={"main-campus"}
            onClick={settingCampus}
          >
            Main
          </button>
          <pre />{" "}
          <button
            className="btn-Acc"
            value={"permanent-campus"}
            onClick={settingCampus}
          >
            Permanent{" "}
          </button>
        </div>{" "}
        <div className="N-line"></div>
        <div>
          <div>
            <button onClick={changeFaculty}><h2>{">"}</h2></button>
            <h2>{faculty[facultyNum]}</h2>
            <button onClick={changeFaculty}><h2>{"<"}</h2></button>
          </div>
          <h3>Your Department : {dep}</h3>
          {
            SelectedArrey.map((dep) => <button className="btn-Acc" value={dep} onClick={settingDep}key={dep}>{dep}</button>)
          }
          {/* <button className="btn-Acc" value={"math"} onClick={settingDep}>
            Math
          </button>
          <br />
          
          <br />
          <button className="btn-Acc" onClick={settingDep}>
            Biology
          </button>
          <br />
          <button className="btn-Acc" onClick={settingDep}>
            Chemistry{" "}
          </button> */}
        </div>{" "}
        <div className="N-line"></div>
        <input className="input-acc"
          type="text"
          name="code"
          id="code"
          placeholder="Code"
          onChange={handleChange}
        />
        <br />
        <br />
        <button className="btn-Acc btn-Acc-sign_in" onClick={handleRedirect}>
          Sign In
        </button>
        <br />
        <br />
        <Link className="btn-Acc btn-Acc-sign_up" to="/sign_up">Sign Up</Link>
      </div>
    </div>
  );
};

export default Access;
