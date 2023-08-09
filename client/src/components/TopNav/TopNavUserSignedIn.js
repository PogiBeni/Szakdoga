import { useContext,useEffect} from "react"
import { UserContext } from "../Context/UserContext"
import { googleLogout } from '@react-oauth/google'

export default function TopNavuserSignedIn() {

    const [user,setUser] = useContext(UserContext)

    useEffect(() =>{

    },[user])

    function signOut()
    {
        setUser({})
        googleLogout()
    }
    return (
        <div className="TopNavUserSignedIn">
            <div>
                <img src={user.link} alt="profilePicture" className="ProfilePicture"/>
            </div>
            <div>
                <h3>{user.name}</h3>
                <button type="button" className="btn btn-warning" onClick={signOut}>Sign out</button>
            </div>
        </div>
    )
}