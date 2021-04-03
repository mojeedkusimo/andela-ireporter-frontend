
import getUser from '../helperFunctions/getUser';

let Dashboard = () => {
    let user = getUser();
    return (
    <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
            <h1 className="m-5 text-center">{user.firstname} Reports</h1>
        </div>
        <div className="col-4"></div>
    </div>
    );
}

export default Dashboard;