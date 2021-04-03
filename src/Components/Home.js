import getUser from "../helperFunctions/getUser";

let Home = () => {
    let user = getUser();
    return (
        <div className="mt-5 text-center text-primary row">
            <div className='col'></div>
            <div className='col-10 m-5'>
                <h1>Welcome to iReporter!</h1>
                <p>Click a link above</p>
                <h3>{user === null ? `Hi Stranger` : `Hi ${user.firstname}`}</h3>
            </div>
            <div className='col'></div>
        </div>
    );
}

export default Home;