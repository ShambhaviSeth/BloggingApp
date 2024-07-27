//check if logged in 
export const isLoggedIn = () => {
    let data = localStorage.getItem("data")
    if(data == null){
        return false;
    }
    else {
        return true;
    }
}

//login the user by putthing data in the local storage
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data))
    next()
}

//dologout
export const doLogout = (next) => {
    localStorage.removeItem("data")
    next()
}

//get current user
export const getCurrentUserDetails = () => {
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }
    else { 
        return undefined;
    }
}

export const getToken = () => {
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token
    } else {
        return null
    }
}