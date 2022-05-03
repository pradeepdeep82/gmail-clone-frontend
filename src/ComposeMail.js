import { useHistory } from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Inbox } from "./Inbox";
import CloseIcon from "@mui/icons-material/Close";

export function ComposeMail() {
  const [to, setTo] = useState([]);
  const [subject, setSubject] = useState([]);
  const [message, setMessage] = useState([]);

  const currentUser = localStorage.getItem("currentUser");
  const history = useHistory();

  const handleSubmit = () => {
    const data = {
      to: to,
      from: currentUser,
      subject: subject,
      message: message,
    };
    fetch("http://localhost:7000/compose", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 400) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      });

    history.push("/inbox");
    setTo("");
    setMessage("");
  };
  return (
    <div>
      <Inbox />
      <form onSubmit={handleSubmit} className="composeForm">
        <h5 className="newMessage">
          New Message
          <CloseIcon
            type="button"
            onClick={() => history.push("/inbox")}
            style={{ position: "absolute", right: "10px" }}
          />
        </h5>
        <div style={{ paddingTop:"5px",padding: "20px" }}>
          <TextField
            fullWidth
            id="standard-basic"
            label="To"
            variant="standard"
            onChange={(event)=>setTo(event.target.value)}
          />
           <TextField
            fullWidth
            id="standard-basic"
            label="Subjet"
            variant="standard"
            onChange={(event)=>setSubject(event.target.value)}
          />
          <TextField
          fullWidth
          id="standard-multiline-static"
          label="Message"
          multiline
          rows={8}
          variant="standard"
          onChange={(event)=>setMessage(event.target.value)}
        />
         
          <button className="btn btn-primary sentBtn" type="submit">
            Send <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
