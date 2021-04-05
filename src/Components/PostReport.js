import axios from "../helperFunctions/customAxios";
import { useState } from "react";
import { useHistory } from "react-router";
import checkData from "../helperFunctions/checkData";
import getUser from "../helperFunctions/getUser";

let PostReport = () => {

let user = getUser();
let history = useHistory();
let [error, setError] = useState("");
let [title, setTitle] = useState("");
let [context, setContext] = useState("");
let [type, setType] = useState("");
let [file, setFile] = useState("");
let [previewSource, setPreviewSource] = useState("");
let [success, setSuccess] = useState(false);

let previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreviewSource(reader.result);
        console.log(typeof(reader.result), reader.result.length);
    };
}

let handleFileUpload = (e) => {
    // setFile("");
    setError("");
    const fileString = e.target.value;
    const file = e.target.files[0];

    setFile(fileString);
    if (fileString.slice(-3).toLowerCase() !== "png" && fileString.slice(-3).toLowerCase() !== "jpg" && fileString.slice(-4).toLowerCase() !== "jpeg") {
        setError("Only image files are allowed! ");
        setFile("");
    } else {
    //     // console.log(file);
        previewFile(file);
    }
}

let handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    let user_id = user === null ? null : user.id; 

    let data = { user_id, title, context, type, imageSource: previewSource, status: "open" };
    let check = checkData(data);

    if ( check === null) {
        setSuccess(true);
        axios.post("new-report", data ).then((res) => {
            setSuccess(false);
            if (res.data.status === "error") {
                setError(res.data.data.message);
                console.log(typeof(previewSource), previewSource.length);

            } else {
                alert(res.data.data.message);
                history.push("/all-reports");
            }
        });
    } else {
    setError(check);

    }
}

    return (
    <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
            <h1 className="m-5 text-center shadow-lg">New Report</h1>
            <form className="bg-light p-5 mb-5" onSubmit={(e) => handleSubmit(e)}>
            <span className="text-danger">{error}</span>
            <p className='col h6 text-primary text-center'>{success ? <i>.....Hang on while we process your request</i> : null}</p>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Subject" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea type="text" className="form-control" id="description" placeholder="Write something here..." value={context} onChange={(e) => setContext(e.target.value)}/>
                </div>
                <div className="form-group">
                <label>Type</label>
                <select id="type" className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                    <option></option>
                    <option>red-flag</option>
                    <option>intervention</option>
                </select>
               </div>
               <div className="form-group">
                    <label>Image Upload</label>
                    <input type="file" className="form-control" id="title" value={file} onChange={handleFileUpload}/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
        </div>
        <div className="col-4"></div>
    </div>
    );
}

export default PostReport;