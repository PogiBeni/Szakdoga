import { UserContext } from '../../Context/UserContext'
import { googleLogout } from '@react-oauth/google'
import { useContext } from "react"
import BasicModal from "../../basicComponents/BasicModal"
import { LabelContext } from '../../Context/LabelContext'
import Cookies from "js-cookie"

export default function LogoutModal() {

    const [user, setUser] = useContext(UserContext)
    const [labels,setLabels] = useContext(LabelContext)

    function signOut() {
        setUser({
            id: null,
            loggedIn: false,
            name: null,
            link: null,
            email: null,
            tasks: [],
            groups: []
        })
        setLabels()
        googleLogout()
        Cookies.remove('userData');
        document.querySelector('.btn-close ').click()
    }
    return (
        <BasicModal name={"logoutModal"} title={"Do you want to logout?"} size={"modal-sm"} centered={true}>
            <div className="d-flex mt-2">
                <button type="button" className="btn btn-light border bg-white me-3 p-2 btn-lg " data-bs-dismiss="modal">Back</button>
                <button type="button" className="btn btn-danger p-2 btn-lg" onClick={signOut}>Logout</button>
            </div>
        </BasicModal>
    )
}