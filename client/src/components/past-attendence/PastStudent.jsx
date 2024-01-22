import React from 'react';
import './PastStudent.css';

const PastStudent = (props) => {
  return (
    <tr key={props.data.code} className="table-row">
      <td className="table-data-code">
        {` ${props.data.code}`}
      </td>
      <td className="table-data-name">{props.data.name}</td>
      <td className="table-data-presence">{props.data.presence}</td>
    </tr>
  );
};

export default PastStudent;