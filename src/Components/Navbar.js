import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../helperFunctions/UserContext";

let Navbar = () => {

    let {isLoggedin, setLogin} = useContext(UserContext);
    let history = useHistory();
    let logout = () => {
        localStorage.clear();
        history.push("/");
        setLogin(false);
        
    }

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top row">
                <div className="col-10">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/all-reports">Reports</Link>
                        </li> 
                        <li className="nav-item">
                            <Link className="nav-link active" to="/new-report">New Report</Link>
                        </li>
                        {isLoggedin ? 
                        <li className="nav-item">
                            <Link className="nav-link active bg-primary rounded text-white" to="/dashboard">Dashboard</Link>
                        </li> :
                        <li className="nav-item">
                            <Link className="nav-link active bg-primary rounded text-white" to="/register">Register</Link>
                        </li>}
                    </ul>
                </div>
                <div className="col-2">
                    <ul className="navbar-nav">
                        {isLoggedin ? 
                        <li className="nav-item">
                            <Link className="nav-link active bg-danger rounded text-white" to="" onClick={logout}>Logout</Link>
                        </li> :
                        <li className="nav-item">
                            <Link className="nav-link active border border-primary rounded" to="/login">Login</Link>
                        </li>}
                    </ul>
                </div>
        </nav>
    </div>
    );
}

export default Navbar;