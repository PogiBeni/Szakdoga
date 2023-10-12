import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { format } from 'date-fns';
import { useState, useRef, useContext } from 'react';
import { deleteTask } from '../../../apiCalls/ApiCalls';
import { UserContext } from '../../Context/UserContext';

export default function TaskWithPopover({ setSelectedTaskForEdit,task }) {

    const [user, setUser] = useContext(UserContext);
    const [show, setShow] = useState(false);
    const target = useRef(null);

    if (!task) return

    var placement = "left"
    if (task.startDate.getDate() % 7 < 4) placement = "right"

    function handleDelete() {
        deleteTask(task).then(() => {
            const updatedTasks = user.tasks.filter((oldTask) => oldTask.id !== task.id);
            setUser((prevUser) => ({ ...prevUser, tasks: updatedTasks }));
            setShow(false)
        })
    }

    return (
        <>
            <div
                key={task.id}
                className="event"
                style={{ backgroundColor: task.color }}
                onClick={() => setShow(!show)}
                ref={target}
            >
                <small>{task.startTime}: </small> <strong>{task.taskName} </strong>
            </div>
            <Overlay
                show={show}
                target={target.current}
                placement={placement}
                containerPadding={20}
                rootClose="true"
                onHide={() => setShow(!show)}
                transition={false}
            >
                <Popover >
                    <Popover.Header style={{ backgroundColor: task.color, color: "white", minWidth: "12rem", fontSize: "1.5rem", fontWeight: "bold" }} className='d-flex justify-content-between'>
                        {"" + task.taskName}
                        <div>

                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#editTaskModal" 
                                onClick={() => setSelectedTaskForEdit(task)}>
                                <img style={{ cursor: "pointer" }} className='me-2' src='/icons/pencilSquareWhite.svg' />
                            </button>
                            <img style={{ cursor: "pointer" }} src='/icons/delete.svg' onClick={handleDelete} />
                        </div>
                    </Popover.Header>
                    <Popover.Body>
                        <div className="d-flex align-items-center mb-1">
                            <img src="/icons/calendarDark.svg" className='me-2' />
                            <div className="form-text mt-0">
                                <strong>{format(task.startDate, 'MMMM dd')}:</strong> {task.startTime}
                            </div>
                        </div>

                        {task.country &&
                            <div className="d-flex align-items-center mb-1">
                                <img src="/icons/location.svg" className='me-2' />
                                <div className="form-text mt-0">
                                    {"" + task.country + ", " + task.cityName} <br />
                                    {task.streetName}
                                </div>
                            </div>}

                        {task.groupName &&
                            <div className="d-flex align-items-center mb-1">
                                <img src="/icons/group.svg" className='me-2' />
                                <div className="form-text mt-0">
                                    {task.groupName}
                                </div>
                            </div>}

                        {task.label &&
                            <div className="d-flex align-items-center mb-1">
                                <img src="/icons/labels.svg" className='me-2' />
                                <div className="form-text mt-0">
                                    {task.label}
                                </div>
                            </div>}

                        <div className="d-flex align-items-center mb-2">
                            <img src="/icons/text.svg" className='me-2' />
                            <div className="form-text mt-0">
                                {task.description}
                            </div>
                        </div>
                    </Popover.Body>
                </Popover>

            </Overlay>
        </>
    )
}