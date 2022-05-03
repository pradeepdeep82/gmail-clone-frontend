import * as React from "react";
import {useEffect, useState} from 'react';
import { Dashboard } from './Dashboard';


export function Sent() {
  const currentUser = localStorage.getItem("currentUser");
  const [data, setData]= useState([]);
  // const [sent, setSent] = useState([]);
  // const [subject,setSubject]=useState([]);
  // const [to, setto]=useState([]);
  const sentMsg = (user) => {
     fetch("http://localhost:7000/sent", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
        username: user,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.map(msg=>msg));
        setData(data.map((msg)=>msg));
        // setSent(data.map(msg=>msg.sentMessage));
        // setSubject(data.map(msg=>msg.subject));
        // setto(data.map(msg=>msg.to));
        
      })
  };
  const deleteMsg=(index)=>{
    const currentUser = localStorage.getItem("currentUser");
    fetch("http://localhost:7000/sent",{
      method:"PUT",
      headers:{
        "content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
      index:index,
      username:currentUser
    }} )
    .then((data)=>data.json())
    .then((data)=>{
      setData(data.map((msg)=>msg));
    })
  }
   useEffect(()=>sentMsg(currentUser),[]);
  return (
    <div>
      <Dashboard 
      data={data}
      // inbox={sent}
      // subject={subject}
      // from={to}
      deleteMsg={deleteMsg}
    />
    </div>
  );
}
