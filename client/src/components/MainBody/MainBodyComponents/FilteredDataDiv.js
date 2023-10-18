import { format, isSameDay } from 'date-fns';
import { changeSubtaskCompletion } from '../../../apiCalls/ApiCalls';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function FilteredDataDiv({ task }) {
    const today = new Date()
    const bodyClass = (isSameDay(task.startDate, today) ? " card border border-dark border-2 rounded" : "card")
    const [user, setUser] = useContext(UserContext);

    function handleCheckboxChange(id, isCompleted) {
        console.log(isCompleted)
        changeSubtaskCompletion({ id, isCompleted })
        const updatedUser = { ...user };
        updatedUser.tasks.forEach((task) => {
            if (task.subtasks) {
                task.subtasks.forEach((subtask) => {
                    if (subtask.id === id) {
                        subtask.isCompleted = isCompleted;
                    }
                });
            }
        });
        setUser(updatedUser);
    }

    
    return (
        <div className={bodyClass} style={{ width: "13rem" }}>
            <h5 className="card-title p-2 ps-3 mb-0 rounded-top-1" style={{ backgroundColor: task.color, color: "white" }}>{task.taskName}</h5>
            <div className="card-body p-2" >

                <div className="d-flex align-items-center mb-1 mt-2">
                    <img src="/icons/calendarDark.svg" className='me-3' />
                    <div className="form-text mt-0 " >
                        <span > <strong>{format(task.startDate, 'MMMM dd')}: </strong></span>
                        <span>{task.startTime}</span>
                    </div>

                </div>
                <div className="d-flex align-items-center mb-1">
                    <img src="/icons/location.svg" className='me-3' />
                    <div className="form-text mt-0">
                        {task.country ? (
                            <span>{task.country}, {task.cityName}<br />{task.streetName}</span>
                        ) : (
                            <span>No location</span>
                        )}

                    </div>
                </div>
                <div className="d-flex align-items-center mb-1">
                    <img src="/icons/group.svg" className='me-3' />
                    <div className="form-text mt-0">
                        {task.groupName ? task.groupName : "No group"}
                    </div>
                </div>
                <div className="d-flex align-items-center mb-1">
                    <img src="/icons/labels.svg" className='me-3' />
                    <div className="form-text mt-0">
                        {task.label ? task.label : "No label"}
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <img src="/icons/text.svg" className='me-3' />
                    <div className="form-text mt-0">
                        {task.description}
                    </div>
                </div>
                {task.subtasks &&
                            <div className='mb-1 mt-0'>
                                <div className="d-flex align-items-center">
                                    <img src="/icons/todo.svg" className='me-2' alt="icon" />
                                    <div className="form-text mt-0">
                                        Subtasks:
                                    </div>
                                </div>

                                <ul>
                                    {task.subtasks.map((subtask, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between">
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    checked={subtask.isCompleted}
                                                    onChange={() => handleCheckboxChange(subtask.id, !subtask.isCompleted)}
                                                />

                                                <span className='ms-2' style={{ textDecoration: subtask.isCompleted ? 'line-through' : 'none' }}>
                                                    {subtask.subtaskName}
                                                </span>
                                            </div>
                                        </li>
                                    ))}</ul> </div>
                        }
            </div>
        </div>
    )
}