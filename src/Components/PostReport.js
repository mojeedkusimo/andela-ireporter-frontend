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

 let handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    let user_id = user === null ? null : user.id; 

    let data = { user_id, title, context, type, status: "open" };
    let check = checkData(data);

    if ( check === null) {
        axios.post("new-report", data ).then((res) => {
            if (res.data.status === "error") {
                setError(res.data.data.message);

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
            <h1 className="m-5 text-center shadow-lg">Create a Post</h1>
            <form className="bg-light p-5 mb-5" onSubmit={(e) => handleSubmit(e)}>
            <span className="text-danger">{error}</span>
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
                <button type="submit" className="btn btn-primary mb-2">Post</button>
            </form>
        </div>
        <div className="col-4"></div>
    </div>
    );
}

export default PostReport;