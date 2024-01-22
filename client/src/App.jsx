import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";

import Profile from "./components/profile/Profile";
import OwnClass from "./components/ownClass/OwnClass";
import Activity from "./components/activity/Activity";
import Home from "./components/home/Home";
import Client from "./components/ownClass/Client";
import Access from "./components/access/Access";
import AddStudent from "./components/ownClass/addStudent/AddStudent";
import SignUp from "./components/signup/SignUp";
import Construction from "./components/Construction";
import PastAttendence from "./components/past-attendence/PastAttendence";
import AddActivity from "./addActivity/AddActivity";

const App = () => {
  const dep = localStorage.getItem("dep");
  const code = localStorage.getItem("code");
  const campus = localStorage.getItem("campus");
  // const form = localStorage.getItem( "form" );
  // const category = localStorage.getItem( "category");
  // const version = localStorage.getItem( "version");
  // const main_department = localStorage.getItem( "main_department" );

  // const standard=localStorage.getItem( "standard");

  const handleDataReceived = (data) => {
    if (!dep) {
      console.log("null");
    } else {
      console.log(data);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home onReceiveData={handleDataReceived}></Home>,
    },
    {
      path: "/sign_up",
      element: <SignUp></SignUp>,
    },
    {
      path: "/profile",
      element: <Profile></Profile>,
    },
    {
      path: "/past-attendence",
      element: <PastAttendence></PastAttendence>,
    },
    {
      path: "/addStudent",
      element: <AddStudent></AddStudent>,
    },
    {
      path: "/ownclass",
      element: <OwnClass></OwnClass>,
      // loader : ()=>{
      //     // :sub/:standard/:version/:sec/:category
      //     return fetch(`${import.meta.env.VITE_API_URL}/students/${main_department}/${standard}/${version}/${form}/${category}`)
      // }
    },
    {
      path: "/activity",
      element: <Activity></Activity>,
      // loader : ()=>{
      //     return fetch(`${import.meta.env.VITE_API_URL}/${dep}/${campus}/${code}`)
      // }
    },
    {
      path: "activity_update/:main_department/:standard/:version/:form/:category",
      element: <AddActivity></AddActivity>,
      // loader : ()=>{
      //     return fetch(`${import.meta.env.VITE_API_URL}/${dep}/${campus}/${code}`)
      // }
    },
  
  ]);
  // console.log(`${campus}${version}${dep}: ${name}${id}`);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/profile" element={<Profile />}  loader={fetchStudents}/>
  //         <Route path="/ownclass" element={<OwnClass />} />
  //         <Route path="/activity" element={<Activity />} />
  //       </Routes>
  //     </BrowserRouter>
  //      <div>
  //      <RouterProvider router={router}></RouterProvider>
  //  </div>
  //   );
};

export default App;
