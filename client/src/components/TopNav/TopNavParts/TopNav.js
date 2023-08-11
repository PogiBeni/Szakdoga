import { UserContext } from "../../Context/UserContext";
import TopNavUserSignedIn from "./TopNavUserSignedIn";
import TopNavUserSignedOut from "./TopNavUserSignedOut";
import { useContext,useEffect } from "react";

export default function TopNav() {

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
    }, [user])

    return (
        <nav  className="navbar bg-warning">
            <div className="TopNavMain">
                <h1>Calendar app</h1>
            </div>
            <div className="justify-content-end">
                {user.loggedIn
                    ? (<TopNavUserSignedIn />)
                    : (<TopNavUserSignedOut />)
                }
            </div>
        </nav >
    )
}