import { Link } from "react-router-dom";

let Navbar = () => {

    let checkLogin = 5 === 5 ? 
                <li className="nav-item">
                    <Link className="nav-link active bg-danger rounded text-white" to="/logout">Logout</Link>
                </li> :
                <li className="nav-item">
                    <Link className="nav-link active border border-primary rounded" to="/login">Login</Link>
                </li>

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
                        <li className="nav-item">
                            <Link className="nav-link active bg-primary text-white rounded" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-2">
                    <ul className="navbar-nav">
                        {checkLogin}
                    </ul>
                </div>
        </nav>
    </div>
    );
}

export default Navbar;