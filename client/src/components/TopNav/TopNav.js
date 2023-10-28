import { UserContext } from "../Context/UserContext";
import TopNavUserSignedIn from "./TopNavUserSignedIn";
import TopNavUserSignedOut from "./TopNavUserSignedOut";
import { useContext, useEffect, useState } from "react";
import { isToday, format } from 'date-fns';

export default function TopNav() {
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
        <nav className="navbar bg-dark">
            <div className="TopNavMain">
                <img src="/icons/calendar.svg" className="MainIcon" />
                <h1>Calendar app</h1>
            </div>
            <div className="justify-content-end">

                {user.loggedIn
                    ?
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


                        <TopNavUserSignedIn />
                    </div>
                    : <TopNavUserSignedOut />
                }
            </div>
        </nav >
    )
}