
import Navbar from "./Components/Navbar";
import { Route, Switch } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Login from "./Components/Login";


let App = () => {
  return (
    <div>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
    </div>
  );
}

export default App;
