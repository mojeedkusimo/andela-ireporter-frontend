import getUser from '../helperFunctions/getUser';
import { useHistory } from 'react-router-dom';
import axios from "../helperFunctions/customAxios";
import { useContext, useState, useEffect } from 'react';
import { ReportContext } from '../helperFunctions/AllContexts';
import checkData from '../helperFunctions/checkData';

let ViewReport = () => {

    let user = getUser();
    let history = useHistory();
    let [otherStatus, setOtherStatus] = useState("");
    let [titleCount, setTitleCount] = useState(0);
    let [contextCount, setContextCount] = useState(0);
    let { viewReport } = useContext(ReportContext);
    let [error, setError] = useState('');
    let [success, setSuccess] = useState(false);
    let [report, setReport] = useState("");
    let [edit, setEdit] = useState(false);
    let [status, setStatus] = useState("");
    let [title, setTitle] = useState("");
    let [context, setContext] = useState("");

    let handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        let trueTitle = title === "" ? report.title : title;
        let trueContext = context === "" ? report.context : context;
;
        let data = {
            title: trueTitle,
            context: trueContext
        };

        axios.patch(`view-report/${viewReport}`, data ).then((res) => {
            if (res.data.status === "error") {
                setError(res.data.data.message);

            } else {
                alert(res.data.data.message);
                history.push("/all-reports");
            }
        });
    }

    let deleteReport = async () => {

        let res = await axios.delete(`view-report/${viewReport}`);

        if (res.data.status === 'error') {
            alert(res.data.data.message);
        } else {
            alert(res.data.data.message);
            history.push('/all-reports');
        }  
    }

    let updateStatus = async (status) => {
        setSuccess(true);
        let res = await axios.patch(`view-report/${viewReport}`, {status});

        if (res.data.status === 'error') {
            setSuccess(false);
            alert(res.data.data.message);
        } else {
            setSuccess(false);
            alert(res.data.data.message);
            history.push('/all-reports');
        }  
    }

    useEffect(() => {
        let getReport = async() => {
            let fetchData = await axios.get(`view-report/${viewReport}`);
            setReport(fetchData.data.data.message);

            if (fetchData.data.status === "success") {
                let statusArray = ["open", "under investigation", "rejected", "resolved"];
                let others = statusArray.map((s, i) => {
                    if ( s !== report.status ) {
                        return (
                            <option key={i}>{s}</option>
                        );
                    }
                    return null;
                });
                setOtherStatus(others);
            }            
        }
        getReport();
    },[setOtherStatus, setReport, report.status, viewReport]);

    let modify = user !== null ? user.firstname === report.firstname ?
                 <div>
                    {success ?                 
                    <div className="row text-center">
                        <div className='col h5 text-primary'>
                            <i>.....Hang on while we process your request</i>
                        </div>
                    </div>
                    : null}  
                    <div className='row mt-5'>
                        <div className='col-4 text-left'><button className='btn btn-success' onClick={() => setEdit(!edit)}>Edit</button></div> 
                        <div className='col-4 text-center btn btn-light border border-primary'>                 
                        {user.isadmin ?                 
                            <div>
                                <select id="type" className="form-control bg-light border border-primary" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option key={report.id}>{report.status}</option>
                                    {otherStatus}
                                </select>
                                <button className='btn border border-primary my-2' onClick={() => updateStatus(status)}>Update</button>
                            </div>
                            : report.status}</div>
                        <div className='col-4 text-right'><button className='btn btn-danger' onClick={() => deleteReport(viewReport)}>Delete</button></div>
                    </div> 
                </div>
                : 
                <div>
                {success ?                 
                    <div className="row text-center">
                        <div className='col h5 text-primary'>
                            <i>.....Hang on while we process your request</i>
                        </div>
                    </div>
                    : null}                
                <div className='row mt-5'>
                    <div className='col-4'></div>   
                    <div className='col-4 text-center btn btn-light border border-primary'>
                    {user.isadmin ?
                        <div>
                            <select id="type" className="form-control bg-light border border-primary" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option>{report.status}</option>
                                {otherStatus}
                            </select>
                            <button className='btn border border-primary my-2' onClick={() => updateStatus(status)}>Update</button>
                        </div>
                        
                        : report.status}</div>
                    </div>
                    <div className='col-4'></div>
                </div>  : null

    return (
    <div>
        {viewReport ? edit 
        ? null
        :report ? 
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
        </div>

        :<div className="row margin-x text-center">
            <div className='col h2 text-primary'>
                <i>.....Please wait while we fetch some data</i>
            </div>
        </div>
        : history.push("/all-reports")}

        { user !== null ? edit ?

        <div className="row mt-5">
            <div className="col-4"></div>
            <div className="col-4">
                <h1 className="m-5 text-center shadow-lg">Edit Report</h1>
                <form className="bg-light p-5 mb-5" onSubmit={(e) => handleSubmit(e)}>
                <span className="text-danger">{error}</span>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Subject" value={titleCount === 0 ? report.title: title} onChange={(e) => {setTitle(e.target.value); setTitleCount(titleCount+1);}}/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea type="text" className="form-control" id="description" placeholder="Write something here..." value={contextCount === 0 ? report.context: context} onChange={(e) => {setContext(e.target.value); setContextCount(contextCount+1);}}/>
                    </div>
                    <button type="submit" className="btn btn-success mb-2">Update</button>
                </form>
            </div>
            <div className="col-4"></div>
        </div>

         : null : null}
    </div>
    );
}

export default ViewReport;