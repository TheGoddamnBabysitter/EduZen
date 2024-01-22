import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cls, setClass] = useState("");
  const [formName, setFormName] = useState("");
  const [category, setcategory] = useState("");
  const [campus, setCampus] = useState("");
  const [version, setVersion] = useState("");
  const [department, setDepartment] = useState("");
  const [mainDep, setMainDep] = useState("");
  const [fm, setFm] = useState(false);

  const [code, setCode] = useState("");

  // uni code
  const generateUniCode = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";

    for (let i = 0; i < 5; i++) {
      // Pick a random character from the character set
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCode(result);
    console.log(result);
  };

  // firstName lastName version cls
  const addValue = (e) => {
    if (e.target.name === "class") {
      setClass(e.target.value);
    } else if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "formName") {
      setFormName(e.target.value);
    }
  };
  const isFormMaster = (e) => {
    if (e.target.innerText === "Yes") {
      setFm(true);

      document.getElementById("fmDiv").style.display = "block";
    } else if (e.target.innerText === "No") {
      setFm(false);
      document.getElementById("fmDiv").style.display = "none";
    }
  };

  const settingCampus = (e) => {
    setCampus(e.target.value);
  };
  const settingVersion = (e) => {
    setVersion(e.target.value);
  };
  const settingcategory = (e) => {
    setcategory(e.target.value);
  };

  const settingDep = (e) => {
    setDepartment(e.target.value);
  };
  const unhidingDep = (e) => {
    setMainDep(e.target.value);
    if (e.target.value === "sci") {
      console.log("match");
      document.getElementById("sci").style.display = "block";
      document.getElementById("comm").style.display = "none";
      document.getElementById("arts").style.display = "none";
    } else if (e.target.value === "comm") {
      document.getElementById("sci").style.display = "none";
      document.getElementById("comm").style.display = "block";
      document.getElementById("arts").style.display = "none";
    } else if (e.target.value === "arts") {
      document.getElementById("sci").style.display = "none";
      document.getElementById("comm").style.display = "none";
      document.getElementById("arts").style.display = "block";
    }
  };

  const handleSubmit = async () => {
    const teacher = {
      _id: { id: `${code}` },
      name: `${firstName} ${lastName}`,
      fm: fm,
      form: {
        name: `${formName}`,
        category: `${category}`,
        main_department: `${mainDep}`,
      },
      version: `${version}`,
      campus: `${campus}`,
      class: `${cls}`,
    };

    console.log(teacher);
    document.getElementById("signUpDiv").style.display = "none";

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/post_teachers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacher, department, campus }),
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
  };

  return (
    <div>
      <Link to={"/"}>
        {" "}
        <button className="btn btn-Acc-sign_up">Return</button>
      </Link>
      <div id="signUpDiv">
        <div className="Code-gen-container">
          <h2>
            <span className="label">Code : </span>{" "}
            <span className="value">{code}</span>
          </h2>
        </div>
        <button className="btn attendance-button" onClick={generateUniCode}>
          Generate a Code
        </button>
        {/* const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cls, setClass] = useState("");
  const [formName, setFormName] = useState("");
  const [category, setcategory] = useState("");
  const [campus, setCampus] = useState("");
  const [version, setVersion] = useState("");
  const [department, setDepartment] = useState("");
  const [mainDep, setMainDep] = useState("");
  const [fm, setFm] = useState(false);
  const [teacher, setTeacher] = useState({});
  const [code, setCode] = useState(""); */}
        {/* for url : campus and dep*/}
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
        </div>
        <div>
          <h3>
            {" "}
            Faculty : {mainDep} <br />
            Department: {department}{" "}
          </h3>
          <button className="btn-Acc" value={"sci"} onClick={unhidingDep}>
            Science
          </button>
          <br />

          <button className="btn-Acc" value={"physics"} onClick={settingDep}>
            Physics{" "}
          </button>
          <br />
          {/* <button className="btn-Acc" value={"biology"} onClick={settingDep}>
            Biology
          </button> */}
          <br />
          <button className="btn-Acc" value={'chemistry'} onClick={settingDep}>
            Chemistry{" "}

          </button>
          <hr />
          {/* Departments */}
          {/* Science */}
          <div id="sci" style={{ display: "none" }}>
            <button className="btn-Acc" value={"math"} onClick={settingDep}>
              Math
            </button>
            <br />
            <button value={"physics"} className="btn-Acc" onClick={settingDep}>
              Physics{" "}
            </button>
            <br />
         
            <br />
            <button value={"chemistry"} className="btn-Acc" onClick={settingDep}>
              Chemistry{" "}
            </button>
            <hr />
          </div>
          {/* Commerse  */}
          <div id="comm" style={{ display: "none" }}></div>
          {/* arts */}
          <div id="arts" style={{ display: "none" }}></div>
        </div>{" "}
        {/* version */}
        <div>
          <h3> Select a Version : {version}</h3>
          <button className="btn-Acc" value={"bangla"} onClick={settingVersion}>
            Bangla
          </button>
          <pre />{" "}
          <button
            className="btn-Acc"
            value={"english"}
            onClick={settingVersion}
          >
            English{" "}
          </button>
        </div>
        {/* names */}
        <input
          type="text"
          name="firstName"
          placeholder="first Name"
          onChange={addValue}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="last Name"
          onChange={addValue}
        />
        <br />
        {/* class */}
        <input
          type="text"
          name="class"
          placeholder="class"
          onChange={addValue}
        />
        <br />
        {/* is form master */}
        <div>
          <h3>Are You a Form Master?</h3>
          <button className="btn btn-Acc-sign_in" onClick={isFormMaster}>
            Yes
          </button>
          <button className="btn btn-Acc-sign_in" onClick={isFormMaster}>
            No
          </button>
          <div id="fmDiv" style={{ display: "none" }}>
            <h2>Hello Form Master!</h2>
            <input
              type="text"
              name="formName"
              placeholder="Form Name"
              onChange={addValue}
            />
            <br />
            <div>
              <h3> Select a category : {category}</h3>
              <button
                className="btn-Acc"
                value={"boys"}
                onClick={settingcategory}
              >
                Boys
              </button>
              <pre />{" "}
              <button
                className="btn-Acc"
                value={"girls"}
                onClick={settingcategory}
              >
                Girls{" "}
              </button>
              <button
                className="btn-Acc"
                value={"combined"}
                onClick={settingcategory}
              >
                Combined{" "}
              </button>
            </div>
          </div>
        </div>
        <button className="btn btn-Acc-sign_up" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignUp;
