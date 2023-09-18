import Calendar from "./Calendar";
import Group from "./Group";
import { useState, useContext } from 'react';
import { UserContext } from "../Context/UserContext";

export default function MainBody() {

    const [showElement,setShowElement] = useState("Calendar")
    const [user, setUser] = useContext(UserContext)

    return (
        <div className="MainBody h-100">
                <ul className="nav flex-column nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => setShowElement("Calendar")}><img src="/icons/calendarDark.svg" className="SideIcon" /></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => setShowElement("Tasks")}><img src="/icons/cardCheckList.svg" className="SideIcon" /></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => setShowElement("Groups")}><img src="/icons/group.svg" className="SideIcon" /></a>
                    </li>
                </ul>
                
                
                
            <div  className={`MainBodyContent ${user.loggedIn === false ? "blur" : ""}`}>
                {showElement ==="Calendar" ? <Calendar/> :""}
                {showElement ==="Tasks" ? <div>Tasks</div> :""}
                {showElement ==="Groups" ? <Group/> :""}
            </div>
            {!user.loggedIn && (
                <h2 className="notLoggedInText">Please log in to view your calendar!</h2>
            )}
        </div>
    )
}