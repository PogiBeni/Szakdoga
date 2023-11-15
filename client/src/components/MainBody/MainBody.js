import Calendar from "./Calendar/Calendar";
import { useContext } from 'react';
import { UserContext } from "../Context/UserContext";

export default function MainBody() {
    const [user, setUser] = useContext(UserContext)

    return (
        <>
            <div className={` ${user.loggedIn === false ? "blur" : ""}`}>
                    <Calendar id="Calendar" />
            </div>
            {!user.loggedIn && (
                <h2 className="notLoggedInText">Please log in to view your calendar!</h2>
            )}
        </>
    )
}