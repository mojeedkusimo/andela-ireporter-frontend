
import Navbar from "./Components/Navbar";
import { Route, Switch } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { UserContext } from "./helperFunctions/UserContext";
import { useState } from "react";


let App = () => {
  let [isLoggedin, setLogin] = useState(false);
  
  return (
    <div>
      <UserContext.Provider value={{isLoggedin, setLogin}}>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
