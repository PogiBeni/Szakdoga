import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
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
            <div >
                {
                    user.link ?
                        <img src={user.link} alt="profilePicture" className="ProfilePicture me-3" />
                        :
                        <img src="/icons/personSquare.svg" alt="profilePicture" className="ProfilePicture me-3" />
                }

            </div>
            <div>
                <h1 className="h3">{user.name}</h1>
                <button type="button" className="btn btn-warning btn-sm" onClick={signOut}>Sign out</button>
            </div>
        </div>
    )
}