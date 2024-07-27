import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { getCurrentUserDetails, isLoggedIn } from "../Auth";

function UserProvider({children}) {

    const [user, setUser] = useState({
        data: {},
        login: false
    })

    useEffect(()=>{
        setUser({
            data: getCurrentUserDetails(),
            login: isLoggedIn()
        })
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider