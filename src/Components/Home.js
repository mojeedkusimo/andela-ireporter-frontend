import { useContext } from "react";
import { Link } from "react-router-dom";
import getUser from "../helperFunctions/getUser";
import { UserContext } from "../helperFunctions/AllContexts";

let Home = () => {

    let { isLoggedin } = useContext(UserContext)
    let user = getUser();
    return (
        <div className="mt-5 text-center text-primary row">
            <div className='col'></div>
            {isLoggedin ? 
                <div className='col-10 m-5'>
                    <h3>{`Hi ${user.firstname}`}</h3>
                    <h1>Have a Report to Share?</h1>
                    <p>Click <Link to='/new-report'>New Report</Link> to get started</p>
                </div>:

                <div className='col-10 m-5'>
                    <h3>{`Hi there!`}</h3>
                    <h1>Welcome to iReporter</h1>
                    <p>Click <Link to='/register'>Register</Link> to get started</p>
                </div>}
            <div className='col'></div>
        </div>
    );
}

export default Home;