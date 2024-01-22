import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import SingleActivity from "./singleActifity/SingleActivity";
import "./activity.css";
const Activity = () => {
  const dep = localStorage.getItem("dep");
  const code = localStorage.getItem("code");
  const campus = localStorage.getItem("campus");

  console.log(dep, code, campus);

  // const activities = useLoaderData()
  // console.log(activities);
  const [activities, setaAtivities] = useState([]);
  const [msg, setaMsg] = useState("");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/${dep}/${campus}/${code}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        if (data[0][0].status === "no") {
          setaMsg("You need to login first");
        } else {
          setaAtivities(data[2]);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }, []);
  return (
    <div className="activity-container">
      <h1 className="activity-title">Your Activity</h1>
      <div className="msg-container">
        {msg}
        {activities.map((activity) => (
          <SingleActivity
            key={activity._id.id}
            activity={activity}
          ></SingleActivity>
        ))}
      </div>
      <button className="btn btn-Add">Add Activity</button>
      <Link className="btn-link" to="/">
        <button className="home-button">Home</button>
      </Link>
    </div>
  );
};

export default Activity;
