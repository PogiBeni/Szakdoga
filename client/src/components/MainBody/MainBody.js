import Calendar from "./Calendar";
import { useContext } from 'react';
import { UserContext } from "../Context/UserContext";

export default function MainBody() {

    const [user, setUser] = useContext(UserContext)


    return (
        <>
            <Calendar className={` ${user.loggedIn === false ? "blur" : ""}`} />
            {!user.loggedIn && (
                <h2 className="notLoggedInText">Please log in to view your calendar!</h2>
            )}
        </>

    )
}