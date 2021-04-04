import { Link } from 'react-router-dom';
import axios from '../helperFunctions/customAxios';
import { useContext, useEffect, useState } from 'react';
import { ReportContext } from "../helperFunctions/AllContexts";

let AllReports = () => {

    let { setViewReport } = useContext(ReportContext);
    let [reports, setReports] = useState("");

    useEffect(() => {
        let getAllReports = async() => {
            let fetchData = await axios.get('/all-reports');
            let allReports = fetchData.data.data.message[0].map((data) => {

                return (
                <div className="row" key={data.id}>
                    <div className="col-4"></div>
                    <div className="col-4" >
                        <h3>{data.title}</h3><small>... by {data.firstname}</small>
                        <p>{`${data.context.slice(0,50)}...`}<Link to='/view-report' onClick={() => setViewReport(data.id)} >Read more</Link></p>
                    </div>
                    <div className="col-4"></div>
                </div>
                )
            });
            setReports(allReports);
        }

        getAllReports();
    },[])
    return (
    <div>
        <div className="mt-5 row">
            <div className='col'></div>
            <div className='col-10'>
                <div>
                    <h1 className="m-5 text-center shadow-lg">All Reports</h1>
                    {reports}
                </div>
            </div>
            <div className='col'></div> 
        </div>
    </div>
    );
}

export default AllReports;