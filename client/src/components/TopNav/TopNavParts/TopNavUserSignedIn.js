import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import LogoutModal from "../Modals/LogoutModal"

export default function TopNavuserSignedIn() {

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
    }, [user])

    return (
        <div className="d-flex justify-content-end">
            < img src={user.link ? user.link : "/icons/personSquare.svg"} alt="profilePicture" className="ProfilePicture me-3 btn btn-warning p-1" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"/>

            <ul class="dropdown-menu dropdown-menu-sm-end">
                <li><span class="dropdown-item me-3">{user.name}</span></li>
                
                <li><hr class="dropdown-divider"/></li>
                <li><button class="dropdown-item btn btn-warning btn-sm  text-end" type="button" data-bs-toggle="modal" data-bs-target="#logoutModal" >Logout</button></li>
            </ul>
            <LogoutModal />
        </div>
    )
}