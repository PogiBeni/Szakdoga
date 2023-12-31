import { useState,createContext } from "react"

export const UserContext = createContext();
export const UserProvider = props => {
    const [user,setUser] = useState(
        {
            id:null,
            loggedIn: false,
            name:null,
            link:null,
            email:null,
            tasks:[],
            groups:[]
        })
    return(
        <UserContext.Provider value={[user,setUser]}>
             {props.children}
        </UserContext.Provider>
    )
}