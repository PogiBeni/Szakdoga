import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import LogoutModal from "../Modals/LogoutModal"

export default function TopNavuserSignedIn() {

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
    }, [user])

    return (
        <div className="d-flex justify-content-end">
            < img src={user.link ? user.link : "/icons/personSquare.svg"} alt="profilePicture" className="ProfilePicture me-3 btn btn-secondary   p-1" data-bs-toggle="dropdown" data-bs-display="static"/>

            <ul className="dropdown-menu dropdown-menu-sm-end">
                <li><span className="dropdown-item me-3">{user.name}</span></li>
                
                <li><hr className="dropdown-divider"/></li>
                <li ><button className="dropdown-item btn btn-danger btn-sm " type="button" data-bs-toggle="modal" data-bs-target="#logoutModal" >< img src="/icons/logOut.svg" className="me-1" alt="logOut pic" />Logout</button></li>
            </ul>
            <LogoutModal />
        </div>
    )
}