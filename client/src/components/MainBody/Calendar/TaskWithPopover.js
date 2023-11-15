import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { format } from 'date-fns';
import { useState, useRef, useContext } from 'react';
import { changeSubtaskCompletion } from '../../../apiCalls/ApiCalls';
import { UserContext } from '../../Context/UserContext';

export default function TaskWithPopover({ setSelectedTaskForEdit, task, setSelectedTaskForDelete }) {

    const [user, setUser] = useContext(UserContext);

    if (!task) return

    var placement = "left"
    var helper = task.startDate.getDate() % 7
    if ((helper > 4) || (helper !== 0)) placement = "right"

    function handleCheckboxChange(id, isCompleted) {
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

    const popover = (
        <Popover >
            <Popover.Header style={{ backgroundColor: task.color, color: "white", minWidth: "12rem", fontSize: "1.5rem", fontWeight: "bold" }} className='d-flex justify-content-between'>
                {"" + task.taskName}
                {user.id == task.creatorId ?
                    <div>
                        <img style={{ cursor: "pointer" }} className='me-2' src='/icons/pencilSquareWhite.svg' alt="icon"
                            data-bs-toggle="modal"
                            data-bs-target="#editTaskModal"
                            onClick={() => {setSelectedTaskForEdit(task)}}
                        />
                        <img style={{ cursor: "pointer" }} src='/icons/delete.svg'
                            data-bs-toggle="modal"
                            data-bs-target="#DeleteTaskModal"
                            onClick={() => { setSelectedTaskForDelete(task)}}
                            alt="icon" />
                    </div>
                    : null}
            </Popover.Header>
            <Popover.Body>
                <div className="d-flex align-items-center mb-1">
                    <img src="/icons/calendarDark.svg" className='me-2' alt="icon" />
                    <div className="form-text mt-0">
                        <strong>{format(task.startDate, 'MMMM dd')}:</strong> {task.startTime}
                    </div>
                </div>

                {task.country &&
                    <div className="d-flex align-items-center mb-1">
                        <img src="/icons/location.svg" className='me-2' alt="icon" />
                        <div className="form-text mt-0">
                            {"" + task.country + ", " + task.cityName} <br />
                            {task.streetName}
                        </div>
                    </div>}

                {task.groupName &&
                    <div className="d-flex align-items-center mb-1">
                        <img src="/icons/group.svg" className='me-2' alt="icon" />
                        <div className="form-text mt-0">
                            {task.groupName}
                        </div>
                    </div>}

                {task.label &&
                    <div className="d-flex align-items-center mb-1">
                        <img src="/icons/labels.svg" className='me-2' alt="icon" />
                        <div className="form-text mt-0">
                            {task.label}
                        </div>
                    </div>}

                <div className="d-flex align-items-center mb-1">
                    <img src="/icons/text.svg" className='me-2' alt="icon" />
                    <div className="form-text mt-0">
                        {task.description}
                    </div>
                </div>
                {task.subtasks.length != 0 ?
                    <div class="accordion border border-0" id="accordionFlushExample">
                        <div class="accordion-item m-0 p-0 border border-0">
                            <button class="accordion-button collapsed p-0" type="button btn-sm" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <div className="d-flex align-items-center">
                                    <img src="/icons/todo.svg" className='me-2' alt="icon" />
                                    <div className="form-text mt-0">
                                        Subtasks:
                                    </div>
                                </div>
                            </button>
                            <div id="flush-collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body py-1 ps-1">
                                    <div className='my-0'>
                                        <ul>
                                            {task.subtasks.map((subtask, index) => (
                                                <li key={index} className="list-group-item d-flex justify-content-between ">
                                                    <div >
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
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
            </Popover.Body>
        </Popover>
    )

    return (
        <>
            <OverlayTrigger trigger="click"
                placement={placement}
                rootClose="true"
                overlay={popover}
                containerPadding={20}>
                <div
                    key={task.id}
                    className="event"
                    style={{ backgroundColor: task.color }}>

                    <small>{task.startTime}: </small> <strong >{task.taskName} </strong>
                </div>
            </OverlayTrigger>
        </>
    )
}