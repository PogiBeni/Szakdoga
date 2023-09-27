import Calendar from "./Calendar";
import { useContext } from 'react';
import { UserContext } from "../Context/UserContext";
import { LabelProvider } from "../Context/LabelContext";

export default function MainBody() {

    const [user, setUser] = useContext(UserContext)


    return (
        <>

            <div className={` ${user.loggedIn === false ? "blur" : ""}`}>
                    <Calendar />
            </div>
            {!user.loggedIn && (
                <h2 className="notLoggedInText">Please log in to view your calendar!</h2>
            )}

        </>
    )
}