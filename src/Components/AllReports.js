import { Link } from 'react-router-dom';
import axios from '../helperFunctions/customAxios';
import { useContext, useEffect, useState } from 'react';
import { ReportContext } from "../helperFunctions/AllContexts";

let AllReports = () => {

    let { setViewReport } = useContext(ReportContext);
    let [reports, setReports] = useState("");
    let [count, setCount] = useState("");

    useEffect(() => {
        let getAllReports = async() => {
            let fetchData = await axios.get('/all-reports');
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
    },[setViewReport])
    return (
    <div>
        <div className="mt-5 row">
            <div className='col-3 p-4 fixed-top margin-x border border-primary rounded'>
                <ul>
                    <li>Total Reports: {count.allReports}</li>
                    <li>Total Reports Open: {count.open}</li>
                    <li>Total Reports Under Investigation: {count.underInvestigation}</li>
                    <li>Total Reports Rejected: {count.rejected}</li>
                    <li>Total Reports Resolved: {count.resolved}</li>
                </ul>
            </div>
            <div className='col'>
                <div>
                    <h1 className="m-5 text-center shadow-lg">All Reports</h1>
                    {reports ? reports : 
                        <div className="row text-center">
                            <div className='col h2 text-primary'>
                                <i>.....Please wait while we fetch some data</i>
                            </div>
                        </div>
                         }
                </div>
            </div>
        </div>
    </div>
    );
}

export default AllReports;