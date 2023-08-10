import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import LogoutModal from "../Modals/LogoutModal"

export default function TopNavuserSignedIn() {

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
    }, [user])

    return (
        <div className="TopNavUserSignedIn">
            <div >
                <img src={user.link ? user.link  : "/icons/personSquare.svg"} alt="profilePicture" className="ProfilePicture me-3" />          
            </div>
            <div>
                <h1 className="h3">{user.name}</h1>
                <button type="button" className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#logoutModal" >Logout</button>
            </div>
            <LogoutModal/>
        </div>
    )
}