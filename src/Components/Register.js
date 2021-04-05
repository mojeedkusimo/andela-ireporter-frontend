import { useState } from "react";
import { useHistory } from 'react-router-dom';
import checkData from "../helperFunctions/checkData";
import axios from "../helperFunctions/customAxios";
import getUser from "../helperFunctions/getUser";

let Register = () => {

  let user = getUser();
  let history = useHistory();
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();

    let isadmin = user === null ? false : true
    setError("");
    setSuccess("");
    let data = {
      firstname, 
      lastname, 
      email, 
      password, 
      phoneNumber,
      isadmin,
    }

    let check = checkData(data);
      if ( check === null ) {
      axios.post('auth/register', data).then((res) => {
            if ( res.data.status === "error" ) {
                setError(res.data.data.message);
              } else {
                alert(res.data.data.message);
                history.push('/login');
              }
          });
      } else {
        setError(check);
    }
  }

  return (    
    <div className="row mt-5">
      <div className="col-4"></div>
      <div className="col-4">
          <h1 className="m-5 text-center shadow-lg">Register</h1>
          <form className="bg-light p-5 mb-5" onSubmit={(e) => handleSubmit(e)}>
              <span className="text-danger">{error}</span>
              <span className="text-success">{success}</span>
              <div className="form-group">
                  <label>Firstname</label>
                  <input type="text" className="form-control" id="firstname" placeholder="John" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
              </div>
              <div className="form-group">
                  <label>Lastname</label>
                  <input type="text" className="form-control" id="lastname" placeholder="Doe" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
              </div>
              <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="john.doe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" id="password" placeholder="*********" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="form-group">
                  <label>Phone Number</label>
                  <input type="number" className="form-control" id="number" placeholder="234123456789" value={phoneNumber} onChange={(e) => setPhoneNumber(Number(e.target.value))}/>
              </div>
              { user !== null ? user.id === 2 ? 
              <div className="form-group">
                <label>Admin</label>
                <select id="isadmin" className="form-control">
                    <option>True</option>
                </select>
               </div>
               : null : null }
              <button type="submit" className="btn btn-primary mt- mb-2">Submit</button>
          </form>
      </div>
      <div className="col-4"></div>
    </div>)
}

export default Register;