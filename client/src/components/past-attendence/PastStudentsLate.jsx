import React, { useState } from 'react';



const PastStudentsLate = (props) => {
    const [updateMsg, setUpdateMsg] = useState("Late");
    // if (props.data.presence === "present") {
    //     document.getElementById(`updateBtn${props.data.code}`).style.display = "none"
    // }
     console.log(document.getElementById(`updateBtn${props.data.code}`).innerText);
    return (
      <tr key={props.data.code} className="table-row">
        <td className="table-data-code">
          {` ${props.data.code}`}
        </td>
        <td className="table-data-name">{props.data.name}</td>
      <td className="table-data-presence">{props.data.presence}</td>
      <td id={`updateBtn${props.data.code}`}> <button   className={"btn btn-Acc"}>{updateMsg}</button></td>
       
      </tr>
    );
  };
export default PastStudentsLate;