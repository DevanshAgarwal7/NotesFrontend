let userDetails: any;
let userNotes: any;
let loggedIn: any;

function setUserDetails(user: any){
    userDetails = user;
    setLoggedInStatus(true);
}

function getUserDetails(){
    return userDetails;
}

function setUserNotes(notes: any){
    userNotes = notes;
}

function getUserNotes(){
    return userNotes;
}

function setLoggedInStatus(status: any){
    loggedIn = status;
}
function getLoggedInStatus(){
    return loggedIn;
}
export{setUserDetails, getUserDetails, setUserNotes, getUserNotes, setLoggedInStatus, getLoggedInStatus}
