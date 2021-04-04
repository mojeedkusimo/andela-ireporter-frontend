import getUser from '../helperFunctions/getUser';
import { useHistory } from 'react-router-dom';
import axios from "../helperFunctions/customAxios";
import { useContext, useState, useEffect } from 'react';
import { ReportContext } from '../helperFunctions/AllContexts';

let ViewReport = () => {

    let { viewReport } = useContext(ReportContext);
    let [error, setError] = useState('');
    let user = getUser();
    let history = useHistory();
    let [report, setReport] = useState("");

    let deleteReport = async (user_id, feed_id) => {
        let data = {user_id, feed_id}
        let res = await axios.delete(`/feed/${feed_id}`, {data});

        if (res.data.status === 'error') {
            setError(res.data.data.message);
        } else {
            alert(res.data.data.message);
            history.push('/feed');
        }  
    }

    useEffect(() => {
        let getReport = async() => {
            let fetchData = await axios.get(`view-report/${viewReport}`);
            setReport(fetchData.data.data.message);
        }
        getReport();
    },[])


    let modify = user.firstname === report.firstname ? 
                <div className='row mt-5'>
                    <div className='col-4 text-left'><button className='btn btn-success'>Edit</button></div>
                    <div className='col-4 text-center text-danger'>{error}</div>
                    <div className='col-4 text-right'><button className='btn btn-danger' onClick={() => deleteReport(user.user_id, user.feed_id)}>Delete</button></div>
                </div> : null

    return (
    <div>
        {viewReport ?         
        <div>
            <div className="row mt-5">
                <div className="col-4"></div>
                <div className="col-4">
                    <h1 className="mt-5  text-center shadow-lg">{report.title}</h1>
                    <small className='text-center d-block'>...by {report.firstname}</small>
                    {modify}
                    <p className='bg-light p-5'>{report.context}</p>
                </div>
                <div className="col-4"></div>
            </div>
        </div> : 
        history.push("/all-reports")}
    </div>
    );
}

export default ViewReport;