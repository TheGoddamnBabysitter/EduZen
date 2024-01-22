import React from 'react';
import { Link } from 'react-router-dom';

const SingleActivity = (props) => {
  const activity = props.activity
  const form = activity.form

  const category = activity.category
  const version = activity.version
  const main_department = activity.main_department
  const standard = activity.standard
  console.log(activity);
    const period = props.activity.period;
    const section = props.activity.form;
    // const section = props.activity.section
// ${main_department}/${standard}/${version}/${form}/${category}
    return (
        <div>
         <h2>at {period} no class you need to go to {standard} {section}-{category}</h2>
           <Link className="btn-link" to={`/activity_update/${main_department}/${standard}/${version}/${form}/${category}`}>
           <button className="btn-Acc">update</button>

      </Link>
        </div>
    );
};

export default SingleActivity;