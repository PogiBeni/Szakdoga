import { useContext, useEffect } from "react"
import { UserContext } from "../Context/UserContext"
import { googleLogout } from '@react-oauth/google'

export default function TopNavuserSignedIn() {

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
    }, [user])

    function signOut() {
        setUser({})
        googleLogout()
    }
    return (
        <div className="TopNavUserSignedIn">
            <div width="5.2rem" height="5.2rem">
                {
                    user.link ?
                        <img src={user.link} alt="profilePicture" className="ProfilePicture me-3" />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-person-square me-3 " viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                        </svg>
                }

            </div>
            <div>
                <h3>{user.name}</h3>
                <button type="button" className="btn btn-warning" onClick={signOut}>Sign out</button>
            </div>
        </div>
    )
}