import LogoutModal from "./ModalParts/LogoutModal"
import { useContext, useEffect, useState } from "react";
import { isToday, format } from 'date-fns';
import { UserContext } from "../Context/UserContext";

export default function TopNavuserSignedIn() {

    const [user, setUser] = useContext(UserContext);
    const [todaysTasks, setTodaysTasks] = useState([]);

    useEffect(() => {
        const today = new Date();
        const filteredTasks = user.tasks.filter(task => {
            return task.notify && isToday(task.startDate);
        });
        setTodaysTasks(filteredTasks);
        
    }, [user]);

    return (
        <div className="d-flex align-items-center">

            <div className="btn-group dropstart">
                <button className="btn btn-secondary position-relative me-3 px-2" data-bs-toggle="dropdown"  >
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {todaysTasks.length != 0 ? todaysTasks.length : 0}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src="/icons/bell.svg" className="icon" />
                </button>
                <ul className="dropdown-menu ">
                    <li ><span className=" mx-2 p-2">{todaysTasks.length != 0 ? "Todays tasks:" : "No notifications!"}</span></li>

                    {todaysTasks
                        ?
                        todaysTasks.map((todaysTask) => (
                            <div key={todaysTask.id}>
                                <hr className="dropdown-divider" />
                                <div className="mx-3">
                                    <strong>{todaysTask.taskName}</strong><br />
                                    <div className="d-flex align-items-center mb-1">
                                        <img src="/icons/calendarDark.svg" className='me-2' alt="icon" />
                                        <div className="form-text mt-0">
                                            <strong>{format(todaysTask.startDate, 'MMMM dd')}:</strong> {todaysTask.startTime}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                        : null
                    }
                </ul>
            </div>
            <div className="d-flex justify-content-end">
                < img src={user.link ? user.link : "/icons/person.svg"} alt="profilePicture" className="ProfilePicture me-3 btn btn-secondary   p-1" data-bs-toggle="dropdown" data-bs-display="static" />
                <ul className="dropdown-menu dropdown-menu-sm-end">
                    <li><span className="dropdown-item me-3">{user.name}</span></li>

                    <li><hr className="dropdown-divider" /></li>
                    <li ><button className="dropdown-item btn btn-danger btn-sm " type="button" data-bs-toggle="modal" data-bs-target="#logoutModal" >< img src="/icons/logOut.svg" className="me-1" alt="logOut pic" />Logout</button></li>
                </ul>
                <LogoutModal />
            </div>
        </div>
    )
}