import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { format } from 'date-fns';
import { useState, useRef } from 'react';
export default function TaskWithPopover({ task, day }) {

    const [show, setShow] = useState(false);
    const target = useRef(null);
    if (!task) return
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
                placement={"left"}
                containerPadding={20}
                rootClose="true"
                onHide={() => setShow(!show)}
                transition={false}
            >
                <Popover >
                    <Popover.Header style={{ backgroundColor: task.color, color: "white", maxWidth: "20rem" ,fontSize:"1.5rem", fontWeight:"bold"}} >{"" + task.taskName}</Popover.Header>
                    <Popover.Body>
                        <div className="d-flex align-items-center mb-1">
                            <img src="/icons/calendarDark.svg" className='me-2' />
                            <div class="form-text mt-0">
                                {format(task.startDate, 'MMMM dd')}: {task.startTime} - {task.endTime}
                            </div>

                        </div>
                        <div className="d-flex align-items-center mb-1">
                            <img src="/icons/group.svg" className='me-2' />
                            <div class="form-text mt-0">
                                {task.groupName ? task.groupName : "No group"}
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                            <img src="/icons/labels.svg" className='me-2' />
                            <div class="form-text mt-0">
                                {task.label ? task.label : "No label"}
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <img src="/icons/text.svg" className='me-2' />
                            <div class="form-text mt-0">
                                {task.description}
                            </div>
                        </div>
                    </Popover.Body>
                </Popover>

            </Overlay>

        </>
    )
}