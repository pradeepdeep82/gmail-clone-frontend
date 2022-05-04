import * as React from "react";
import { useState, useEffect } from "react";

function Userlist({ user }) {
  return (
    <div>
      <h4>{user}</h4>
    </div>
  );
}
export function Users() {
  const [users, setUsers] = useState([]);
  const userList = () => {
    // fetch("http://localhost:7000/users", {
      fetch("https://gmail-clone-pradeep.herokuapp.com/users", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((data) => setUsers(data));
  };
  useEffect(() => userList(), []);
  return (
    <div>
      {users.map((data) => {
        return <Userlist user={data} />;
      })}
    </div>
  );
}
