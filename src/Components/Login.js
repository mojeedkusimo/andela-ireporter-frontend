import { useState, useContext } from "react";
import axios from "../helperFunctions/customAxios";
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import checkData from "../helperFunctions/checkData";
import { UserContext } from "../helperFunctions/AllContexts";

let Login = () => {

let {isLoggedin, setLogin} = useContext(UserContext);
let history = useHistory();
let [email, setEmail] = useState("");
let [password, setPassword] = useState("");
let [error, setError] = useState("");
let [success, setSuccess] = useState("");

 let handleSubmit = (e) => {
     e.preventDefault();

    setError("");
    setSuccess("");

    let data = {
      email, password
    }

    let result = checkData(data);

    if ( result !== null ) {
      setError(result);
    } else {
    
      axios.post("auth/login", data).then((res) => {
        if (res.data.status === "error") {
          setError(res.data.data.message);
  
        } else {
          let {token} = res.data.data;
          let user = (jwtDecode(token));
          localStorage.setItem("userData", JSON.stringify(user));
          setLogin(true);
          history.push('/dashboard');
        }
      });
  
    }
}

    return (    
    <div className="row mt-5">
      <div className="col-4"></div>
      <div className="col-4">
          <h1 className="m-5 text-center shadow-lg">Login {isLoggedin}</h1>
          <form className="bg-light p-5" onSubmit={(e) => handleSubmit(e)}>
              <span className="text-danger">{error}</span>
              <span className="text-success">{success}</span>
              <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="john.doe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" id="password" placeholder="*********" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
          </form>
      </div>
      <div className="col-4"></div>
    </div>)
}

export default Login;