import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { format } from 'date-fns';
import { useState, useRef } from 'react';
export default function TaskWithPopover({ task }) {

    const [show, setShow] = useState(false);
    const target = useRef(null);
    if (!task) return

    var placement="left"
    if(task.startDate.getDate()%7 < 4) placement="right"
    
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
                    <Popover.Header style={{ backgroundColor: task.color, color: "white", minWidth: "12rem" ,fontSize:"1.5rem", fontWeight:"bold"}} >{"" + task.taskName}</Popover.Header>
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
                                { ""+task.country +", "+ task.cityName} <br/>
                                {task.streetName}
                            </div>
                        </div> }

                        {task.groupName &&
                        <div className="d-flex align-items-center mb-1">
                            <img src="/icons/group.svg" className='me-2' />
                            <div className="form-text mt-0">
                               {task.groupName}
                            </div>
                        </div> }

                        { task.label &&
                        <div className="d-flex align-items-center mb-1">
                            <img src="/icons/labels.svg" className='me-2' />
                            <div className="form-text mt-0">
                                 {task.label}
                            </div>
                        </div> }

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