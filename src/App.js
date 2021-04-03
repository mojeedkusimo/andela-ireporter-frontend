
import Navbar from "./Components/Navbar";
import { Route, Switch } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";


let App = () => {
  return (
    <div>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/register" component={Register}/>
    </Switch>
    </div>
  );
}

export default App;
