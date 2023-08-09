import { UserContext } from "../Context/UserContext";
import TopNavUserSignedIn from "./TopNavUserSignedIn";
import TopNavUserSignedOut from "./TopNavUserSignedOut";
import { useContext,useEffect } from "react";

export default function TopNav() {

    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
    }, [user])

    return (
        <div className="TopNav">
            <div className="TopNavMain">
                <h1>Calendar app</h1>
            </div>
            <div className="TopNavUser">
                {user.loggedIn
                    ? (<TopNavUserSignedIn />)
                    : (<TopNavUserSignedOut />)
                }
            </div>
        </div>
    )
}