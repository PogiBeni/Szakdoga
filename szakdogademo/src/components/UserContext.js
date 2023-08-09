import { useState,createContext } from "react"

export const UserContext = createContext();

export const UserProvider = props => {

    const [user,setUser] = useState(
        {
            id:0,
            loggedIn: false,
            name:"",
            link:"",
            email:""
        })

    return(
        <UserContext.Provider value={[user,setUser]}>
             {props.children}
        </UserContext.Provider>
    )
}