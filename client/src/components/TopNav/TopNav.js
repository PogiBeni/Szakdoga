import { UserContext } from "../Context/UserContext";
import TopNavUserSignedIn from "./TopNavUserSignedIn";
import TopNavUserSignedOut from "./TopNavUserSignedOut";
import { useContext } from "react";

export default function TopNav() {
    const [user, setUser] = useContext(UserContext);

    return (
        <nav className="navbar bg-dark">
            <div className="TopNavMain">
                <img src="/icons/calendar.svg" className="MainIcon" />
                <h1>Calendar app</h1>
            </div>
                {user.loggedIn
                    ? <TopNavUserSignedIn />
                    : <TopNavUserSignedOut /> }
        </nav >
    )
}