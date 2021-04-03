

let checkData = (inputFields) => {

    let result = Object.values(inputFields).find((input) => {
        return input === "";
    });

    if ( result !== undefined ) {
        return "Please fill all fields";   
    } 

    return null;
}

export default checkData;