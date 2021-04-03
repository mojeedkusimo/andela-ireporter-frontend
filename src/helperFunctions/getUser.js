
let getUser = () => {
    return JSON.parse(localStorage.getItem("userData"));
}

export default getUser;
