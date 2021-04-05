
import getUser from '../helperFunctions/getUser';
import { Link } from 'react-router-dom';
import axios from '../helperFunctions/customAxios';
import { useContext, useEffect, useState } from 'react';
import { ReportContext } from "../helperFunctions/AllContexts";

let Dashboard = () => {
    let user = getUser();
    let { setViewReport } = useContext(ReportContext);
    let [reports, setReports] = useState("");
    let [count, setCount] = useState("");

    useEffect(() => {
        let getAllReports = async() => {
            let fetchData = await axios.get(`/my-reports/${user.id}`);
            let count = fetchData.data.data.count;
            let allReports = fetchData.data.data.message[0].map((data) => {

                return (
                <div className="row" key={data.id}>
                    <div className="col-4"></div>
                    <div className="col-4" >
                        <h3>{data.title}</h3>
                        <small>... by {data.firstname}&nbsp; 
                            <span className='btn btn-light border border-primary'>{data.status}</span>
                            <span className='btn btn-primary'>{data.type}</span> 
                        </small>
                        <p>{`${data.context.slice(0,50)}...`}<Link to='/view-report' onClick={() => setViewReport(data.id)} >Read more</Link></p>
                    </div>
                    <div className="col-4"></div>
                </div>
                )
            });
            setReports(allReports);
            setCount(count);
        }

        getAllReports();
    },[])

    return (
    <div className="row mt-5">
        <div className='col-3 p-4 fixed-top margin-x border border-primary rounded'>
            <ul>
                <li>Total Reports: {count.allReports}</li>
                <li>Total Reports Open: {count.open}</li>
                <li>Total Reports Under Investigation: {count.underInvestigation}</li>
                <li>Total Reports Rejected: {count.rejected}</li>
                <li>Total Reports Resolved: {count.resolved}</li>
            </ul>
        </div>
        <div className="col">
            <h1 className="m-5 text-center">My Reports</h1>
            <p className='text-center'>{ user.id === 2 ? <Link to='/register' className='btn btn-primary'>Create Admin</Link> : null}</p>
            {reports ? reports : 
                <div className="row text-center">
                    <div className='col h2'>
                        <i>.....Please wait while we fetch some data</i>
                    </div>
                </div>
            }
        </div>
    </div>
    );
}

export default Dashboard;