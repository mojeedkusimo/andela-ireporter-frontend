import getUser from '../helperFunctions/getUser';
import { useHistory } from 'react-router-dom';
import axios from "../helperFunctions/customAxios";
import { useContext, useState, useEffect } from 'react';
import { ReportContext } from '../helperFunctions/AllContexts';
import checkData from '../helperFunctions/checkData';

let ViewReport = () => {

    let [titleCount, setTitleCount] = useState(0);
    let [contextCount, setContextCount] = useState(0);
    let { viewReport } = useContext(ReportContext);
    let [error, setError] = useState('');
    let user = getUser();
    let history = useHistory();
    let [report, setReport] = useState("");
    let [edit, setEdit] = useState(false);


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
            setError(res.data.data.message);
        } else {
            alert(res.data.data.message);
            history.push('/all-reports');
        }  
    }

    useEffect(() => {
        let getReport = async() => {
            let fetchData = await axios.get(`view-report/${viewReport}`);
            setReport(fetchData.data.data.message);
        }
        getReport();
    },[])


    let modify = user !== null ? user.firstname === report.firstname ? 
                <div className='row mt-5'>
                    <div className='col-4 text-left'><button className='btn btn-success' onClick={() => setEdit(!edit)}>Edit</button></div>
                    <div className='col-4 text-center text-danger'>{error}</div>
                    <div className='col-4 text-right'><button className='btn btn-danger' onClick={() => deleteReport(viewReport)}>Delete</button></div>
                </div> : null : null

    return (
    <div>
        {viewReport ? edit ? null :
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