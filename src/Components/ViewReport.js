import getUser from '../helperFunctions/getUser';
import checkData from '../helperFunctions/checkData';
import { useHistory } from 'react-router-dom';
import axios from "../helperFunctions/customAxios";
import { useContext, useState, useEffect } from 'react';
import { ReportContext } from '../helperFunctions/AllContexts';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
require('dotenv').config();


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
    let [comment, setComment] = useState("");
    let [userComment, setUserComment] = useState("");

    let handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (edit === false) {
            let commentData = {
                comment,
                author_id: user.id,
                report_id: viewReport
            }
            let check = checkData(commentData);
            
            check === null 
            ? axios.post(`new-comment`, commentData).then((res) => {
                if (res.data.status === "error") {
                    setError(res.data.data.message);
    
                } 
                else {
                    alert(res.data.data.message);
                    history.push("/all-reports");
                }
            })
            : setError(check);

        } else {
            let trueTitle = title === "" ? report.title : title;
            let trueContext = context === "" ? report.context : context;
            let data = {
                title: trueTitle,
                context: trueContext
            };
    
            axios.patch(`view-report/${viewReport}`, data ).then((res) => {
                if (res.data.status === "error") {
                    setError(res.data.data.message);
    
                } else {
                    alert(res.data.data.message);
                    setEdit(!edit);
                    history.push("/all-reports");
                }
            });
    
        }
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
        let getReportData = async() => {
            let fetchReport = await axios.get(`view-report/${viewReport}`);
            setReport(fetchReport.data.data.message);

            let fetchComments = await axios.get(`comments/${viewReport}`);
            // setUserComment(fetchComments.data.data.message);

            let allComments = fetchComments.data.data.message.map((data) => {

                return (
                    <p className='bg-light p-4'>{data.firstname}: {data.comment}</p>
                )
            });
            setUserComment(allComments);

            if (fetchReport.data.status === "success") {
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
        getReportData();
    },[setOtherStatus, setReport, report.status, viewReport]);

    let modify = user !== null ? // dynamically display divs below since a user is logged in
                        user.firstname === report.firstname ? // dsiplay next line since its the author
                                        <div>
                                            {success ?                 
                                            <div className="row text-center">
                                                <div className='col h5 text-primary'>
                                                    <i>.....Hang on while we process your request</i>
                                                </div>
                                            </div>
                                            : null}  
                                            <div className='row mt-5'>
                                                <div className='col-4 text-left'><button className='btn btn-primary' onClick={() => setEdit(!edit)}>Edit</button></div> 
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
                                                    <div className='col-4 text-right'><button className='btn btn-danger' onClick={() => deleteReport(viewReport)}>Delete</button></div>
                                            </div> 
                                        </div>
                                    
                                        : // dsiplay this since its not the author
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
                                            </div>  
                
                        :// display below div since no user is logged in
                        <div className='row mt-5'>
                            <div className='col-4'></div>   
                            <div className='col-4 text-center btn btn-light border border-primary'>{report.status}</div>
                            <div className='col-4'></div>
                        </div>

const mapStyles = {        
    height: "50vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: report.lat, lng: report.lon
  }
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

            {report.image_source ? 
                <div className='row'>
                <div className="col-4"></div>
                <div className="col-4">
                    <img height='500' width='100%' className='rounded' src={report.image_source} alt='pix-proof'/>
                    {/* img-fluid */}
                </div>
                <div className="col-4"></div>
            </div> 
            :null }

            {report.lat ? 
                <div className='row mt-3'>
                <div className="col-4"></div>
                <div className="col-4">
                    <LoadScript 
                        googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}>
                        <GoogleMap 
                            mapContainerStyle={mapStyles}
                            zoom={20}
                            center={defaultCenter}
                        >
                            <Marker key={`Location`} position={defaultCenter}/>
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className="col-4"></div>
            </div>
            :null }

            {user ? 
                <div className="row mt-5">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <h1 className="m-5 text-center shadow-lg">Comment</h1>
                        <form className="bg-light p-4 mb-5" onSubmit={(e) => handleSubmit(e)}>
                        <span className="text-danger">{error}</span>
                            <div className="form-group">
                                <textarea type="text" className="form-control" id="description" placeholder="Write something here..." value={comment} onChange={(e)=> setComment(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary mb-2">Submit</button>
                        </form>

                        {/* View Comments */}
                        {userComment ? userComment: null}
                    </div>
                    <div className="col-4"></div>
                </div>
                : null
            }
            
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
                    <button type="submit" className="btn btn-primary mb-2">Update</button>
                </form>
            </div>
            <div className="col-4"></div>
        </div>

         : null : null}
    </div>
    );
}

export default ViewReport;