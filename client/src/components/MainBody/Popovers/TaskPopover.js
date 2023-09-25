import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { isSameDay } from 'date-fns';
import { useState, useRef } from 'react';
export default function TaskPopover({ tasks, day }) {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    var placementVar
    if (day) {
        if (day.getDate() > 28) {
            placementVar = "top"
        }
        else placementVar = "bottom"
    }
    return (
        <>
            <div className="event" ref={target}  onClick={() => setShow(!show)} style={{ backgroundColor: "red" }}>
                {tasks.filter((task) => isSameDay(task.startDate, day)).length} events
            </div>
            <Overlay
                show={show}
                target={target.current}
                placement={placementVar}
                containerPadding={20}
                rootClose="true"
                onHide={() => setShow(!show)}
                transition={false}
            >
                <Popover >
                    <Popover.Header className='eventHeader' as="h3">{`Events:`}</Popover.Header>
                    <Popover.Body>
                        {tasks.map((task) => (
                            isSameDay(task.startDate, day) && (
                                <div
                                    key={task.id}
                                    className="event d-flex justify-content-between text-truncate"
                                    style={{ backgroundColor: task.color }}
                                >
                                    <div>{task.startTime}    </div><div>{task.taskName}</div> 
                                </div>
                            )
                        ))}
                    </Popover.Body>
                </Popover>

            </Overlay>

        </>
    )
}