
import Navbar from "./Components/Navbar";
import { Route, Switch } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { ReportContext, UserContext } from "./helperFunctions/AllContexts";
import { useState } from "react";
import PostReport from "./Components/PostReport";
import AllReports from "./Components/AllReports";
import getUser from "./helperFunctions/getUser";
import ViewReport from "./Components/ViewReport";


let App = () => {
  let userCheck = getUser() ? true : false
  let [isLoggedin, setLogin] = useState(userCheck);
  let [viewReport, setViewReport] = useState("");
  
  return (
    <div>
      <UserContext.Provider value={{ isLoggedin, setLogin }}>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/new-report" component={PostReport}/>
            <ReportContext.Provider value={{ viewReport, setViewReport }}>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/all-reports" component={AllReports}/>
              <Route exact path="/view-report" component={ViewReport}/>
              <Route exact path="/my-reports" component={AllReports}/>
            </ReportContext.Provider>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
