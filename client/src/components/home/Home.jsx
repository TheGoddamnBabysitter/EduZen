import React, { useEffect, useState } from "react";
import "./home.css";

import { Link } from "react-router-dom";
import Access from "../access/Access";

const Home = (props) => {
  const name = localStorage.getItem("name");
  const check = localStorage.getItem("isLogged");
  console.log(check);
  const [isLogged, setIsLogged] = useState(check);
  //   useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/photos')
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         setPhotos(data);
  //       });
  //   }, []);

  useEffect(() => {
    if (isLogged) {
      document.getElementById("home").style.display = "block";
      document.getElementById("access").style.display = "none";
    } else {
      document.getElementById("home").style.display = "none";
      document.getElementById("access").style.display = "block";
    }
  }, [isLogged]);

  function fetchData(dep, campus, code) {
    const response = fetch(
      `${import.meta.env.VITE_API_URL}/${dep}/${campus}/${code}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle fetched data (e.g., update state or display it)
        console.log(data[0][0].status);
        if (data[0][0].status === "no") {
          alert("You don't have any id, Sign up frst");
        } else {
          localStorage.setItem("dep", dep);
          localStorage.setItem("campus", campus);
          localStorage.setItem("code", code);

          console.log(data);
          setIsLogged(true);
          localStorage.setItem("isLogged", true);

          const teachersInfo = data[1][0];
          console.log(teachersInfo);
          localStorage.setItem("name", teachersInfo.name);
          localStorage.setItem("form", teachersInfo.form.name);
          localStorage.setItem("category", teachersInfo.form.category);
          localStorage.setItem("version", teachersInfo.version);
          localStorage.setItem(
            "main_department",
            teachersInfo.form.main_department
          );
          localStorage.setItem("standard", teachersInfo.class);
          props.onReceiveData(teachersInfo);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
    // if (!response.ok) {
    //   alert('Failed to delete post. Please try again.');
    // }
  }

  const handleDataReceived = (childData) => {
    console.log(childData);
    fetchData(childData.dep.toLowerCase(), childData.campus, childData.code);
  };

  return (
    <div>
      <div id="access">
        <Access onReceiveData={handleDataReceived}></Access>
      </div>
      <div id="home">
        <h3>Welcome back {name}.</h3>
        <h2>Let's finish some work</h2>
        <br />
        <Link className="btn-link" to="/ownclass">
          <button>Own Class</button>
        </Link>{" "}
        <br />
        <br />
        <br />
        <Link className="btn-link" to="/activity">
          <button>Activity</button>
        </Link>
        <br />
        <br />
        <br />
        <Link className="btn-link" to="/profile">
          <button>Profile</button>
        </Link>
        <br />
        <br />
        <br />
        <button
          className="btn-Acc btn-Acc-sign_up"
          onClick={() => {
            setIsLogged(false);
            // localStorage.removeItem('isLogged');
            // localStorage.removeItem("campus");

            // localStorage.removeItem("dep");
            // localStorage.removeItem("code");
            localStorage.clear();
          }}
        >
          log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
