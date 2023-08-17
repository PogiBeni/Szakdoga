import { UserContext } from "../../Context/UserContext"
import { googleLogout } from '@react-oauth/google'
import { useContext } from "react"

export default function LogoutModal() {

    const [user, setUser] = useContext(UserContext)

    function signOut() {
        setUser({})
        googleLogout()
        document.querySelector('.btn-close ').click()
    }
    return (
        <div className="modal fade" id="logoutModal" aria-hidden="true" aria-labelledby="logoutModalLabel" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white" data-bs-theme="dark">
                        <h1 className="modal-title fs-5" id="logoutModalLabel">Do you want to logout?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center flex-column">
                        <div className="d-flex mt-4">
                            <button type="button" className="btn btn-light border bg-white me-3 p-2 btn-lg " data-bs-dismiss="modal">Back</button>
                            <button type="button" className="btn btn-danger p-2 btn-lg" onClick={signOut}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}