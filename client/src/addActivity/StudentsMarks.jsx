import React, { useEffect, useState } from "react";
import "./StudentMarks.css";
const StudentsMarks = (props) => {
  const [mcqGpa, setMcqGpa] = useState(0);
  const [cqGpa, setCqGpa] = useState(0);

  const student = props.student;
  let code = student._id.id;
  let name = student.name;
  let cq = props.cq;
  let mcq = props.mcq;

  // if (!isCq) {
  //   document.getElementById("cqPlusMcq").style.display = 'none'
  // }else{
  //   document.getElementById("cqPlusMcq").style.display = 'block'
  // }

  const handleChangeCq = (e) => {
    // console.log((e.target.value/cq)*100);
    if ((e.target.value / cq) * 100 >= 0 && (e.target.value / cq) * 100 <= 32) {
      setCqGpa(0);
      props.gettingCq({
        value: e.target.value,
        code: code,
        gpa: 0,
      });
    } else if (
      (e.target.value / cq) * 100 >= 33 &&
      (e.target.value / cq) * 100 <= 39
    ) {
      setCqGpa(1);
      props.gettingCq({
        value: e.target.value,
        code: code,
        gpa: 1,
      });
    } else if (
      (e.target.value / cq) * 100 >= 40 &&
      (e.target.value / cq) * 100 <= 49
    ) {
      setCqGpa(2);
      props.gettingCq({
        value: e.target.value,
        code: code,
        gpa: 2,
      });
    } else if (
      (e.target.value / cq) * 100 >= 50 &&
      (e.target.value / cq) * 100 <= 59
    ) {
      setCqGpa(3);
      props.gettingCq({
        value: e.target.value,
        code: code,
        gpa: 3,
      });
    } else if (
      (e.target.value / cq) * 100 >= 60 &&
      (e.target.value / cq) * 100 <= 69
    ) {
      setCqGpa(3.5);
      props.gettingCq({
        value: e.target.value,
        code: code,
        gpa: 3.5,
      });
    } else if (
      (e.target.value / cq) * 100 >= 70 &&
      (e.target.value / cq) * 100 <= 79
    ) {
      setCqGpa(4);
      props.gettingCq({
        value: e.target.value,
        code: code,
        gpa: 4,
      });
    } else if (
      (e.target.value / cq) * 100 >= 80 &&
      (e.target.value / cq) * 100 <= 100
    ) {
      setCqGpa(5);
      props.gettingCq({
        value: e.target.value,
        code: code,
        gpa: 5,
      });
    } else {
      setCqGpa(0);
      props.gettingCq({
        value: e.target.value,
        code: code,
        gpa: 0,
      });
    }
  };
  const handleChangeMcq = (e) => {
    console.log((e.target.value / mcq) * 100);
    if (
      (e.target.value / mcq) * 100 >= 0 &&
      (e.target.value / mcq) * 100 <= 32
    ) {
      setMcqGpa(0);
      props.gettingMcq({
        value: e.target.value,
        code: code,
        gpa: 0,
      });
    } else if (
      (e.target.value / mcq) * 100 >= 33 &&
      (e.target.value / mcq) * 100 <= 39
    ) {
      setMcqGpa(1);
      props.gettingMcq({
        value: e.target.value,
        code: code,
        gpa: 1,
      });
    } else if (
      (e.target.value / mcq) * 100 >= 40 &&
      (e.target.value / mcq) * 100 <= 49
    ) {
      setMcqGpa(2);
      props.gettingMcq({
        value: e.target.value,
        code: code,
        gpa: 2,
      });
    } else if (
      (e.target.value / mcq) * 100 >= 50 &&
      (e.target.value / mcq) * 100 <= 59
    ) {
      setMcqGpa(3);
      props.gettingMcq({
        value: e.target.value,
        code: code,
        gpa: 3,
      });
    } else if (
      (e.target.value / mcq) * 100 >= 60 &&
      (e.target.value / mcq) * 100 <= 69
    ) {
      setMcqGpa(3.5);
      props.gettingMcq({
        value: e.target.value,
        code: code,
        gpa: 3.5,
      });
    } else if (
      (e.target.value / mcq) * 100 >= 70 &&
      (e.target.value / mcq) * 100 <= 79
    ) {
      setMcqGpa(4);
      props.gettingMcq({
        value: e.target.value,
        code: code,
        gpa: 4,
      });
    } else if (
      (e.target.value / mcq) * 100 >= 80 &&
      (e.target.value / mcq) * 100 <= 100
    ) {
      setMcqGpa(5);
      props.gettingMcq({
        value: e.target.value,
        code: code,
        gpa: 5,
      });
    } else {
      setMcqGpa(0);
      props.gettingMcq({
        value: e.target.value,
        code: code,
        gpa: 0,
      });
    }
  };

  return (
    <tr key={code} className="SMU-student-row">
      <td
        data-label="Code"
        id={`SMU-code-${code}`}
        className="SMU-student-code"
      >{`${code}`}</td>
      <td
        data-label="Name"
        id={`SMU-name-${code}`}
        className="SMU-student-name"
      >
        {name}
      </td>
      <td
        data-label="C.Q"
        id={`SMU-cq-${code}`}
        className="SMU-attendance-button-container"
      >
        <input
          name="cq"
          onChange={handleChangeCq}
          type="number"
          placeholder="C.Q Marks"
        />
      </td>
      <td
        data-label="M.C.Q"
        id={`SMU-mcq-${code}`}
        className="SMU-attendance-button-container"
      >
        <input
          name="mcq"
          onChange={handleChangeMcq}
          type="number"
          placeholder="M.C.Q MArks"
        />
      </td>
      <td id={`SMU-cqGpa-${code}`} className="SMU-attendance-button-container">
        <input disabled placeholder={`CQ GPA: ${cqGpa}`} type="text" />
      </td>
      <td id={`SMU-mcqGpa-${code}`} className="SMU-attendance-button-container">
        <input disabled placeholder={`MCQ GPA: ${mcqGpa}`} type="text" />
      </td>
    </tr>
  );
};

export default StudentsMarks;
