
import * as React from 'react';
import {useState, useEffect} from 'react';
import { Dashboard } from './Dashboard';


export function Inbox() {
  const currentUser = localStorage.getItem("currentUser");
  const [data, setData]= useState([]);
  const [inbox, setInbox] = useState([]);
  const [subject,setSubject]=useState([]);
  const [from, setFrom]=useState([]);
  const inboxMsg = (user) => {
     fetch("http://localhost:7000/inbox", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
        username: user,
      },
      // body:JSON.stringify(user)  body is not needed for GET method
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.map(msg=>msg));
        setData(data.map((msg)=>msg));
        setInbox(data.map(msg=>msg.receivedMessage));
        setSubject(data.map(msg=>msg.subject));
        setFrom(data.map(msg=>msg.from));
        console.log(inbox);
      });
  };

  const deleteMsg=(index)=>{
    const currentUser = localStorage.getItem("currentUser");
    fetch("http://localhost:7000/inbox",{
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
 
 useEffect(()=>inboxMsg(currentUser),[]);
 

  return (
    
    <div>
      
    <Dashboard 
    data={data}
      inbox={inbox}
      subject={subject}
      from={from}
      deleteMsg={deleteMsg}
    />
    </div>
  );
}
