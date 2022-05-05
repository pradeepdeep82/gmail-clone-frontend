import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import * as React from "react";
import { LoginPage } from "./Login.js";
import { SignUp } from "./Signup.js";
import { Inbox } from "./Inbox";
import { Sent } from "./Sent";
import { ComposeMail } from "./ComposeMail";
import { Users } from "./Users";
import { Dashboard } from "./Dashboard";
import { ForgotPassword } from "./ForgotPassword";


import { ResetPassword } from "./ResetPassword";

function App() {
  // const history = useHistory();
  // const logout = () => {
  //   localStorage.removeItem("currentUser");
  //   localStorage.removeItem("token");
  //   history.push("/login");
  // };
  const token=localStorage.getItem("token");
  return (
    <div className="App">
      <div>
        {/* <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/login">
          Login
        </Link>
        <Link className="link" to="/signup">
          Signup
        </Link>
        <Link className="link" to="/inbox">
          Inbox
        </Link>
        <Link className="link" to="/sent">
          Sent
        </Link>
        <Link className="link" to="/compose">
          Compose mail
        </Link>
        <Link className="link" onClick={logout}>
          Log out
        </Link>
        <Link className="link" to="/users">
          Users
        </Link>
        <Link className="link" to="/dashboard">
          Dashboard
        </Link> */}
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/login/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/reset-password/:username/:token">
            <ResetPassword />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/inbox">
            <Inbox />
          </Route>
          <Route path="/sent">
            <Sent />
          </Route>
          <Route path="/compose">
            <ComposeMail />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route exact path="/">
              {token ?<Redirect to="/inbox"/>:<Redirect to="/login"/>}
          </Route>
        </Switch>

      
      </div>
    </div>
  );
}


export default App;

