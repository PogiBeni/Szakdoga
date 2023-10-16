import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { isSameDay } from 'date-fns';
import { useState, useRef } from 'react';
import TaskWithPopover from './TaskWithPopover';
export default function TaskPopover({ tasks, day,setSelectedTaskForEdit,setSelectedTaskForDelete }) {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    var placementVar
    if (day) {
        if (day.getDate() >= 21) {
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
                    <Popover.Header style={{backgroundColor:"black",color:"white", fontWeight:"bold"}}>{`Events:`}</Popover.Header>
                    <Popover.Body>
                        {tasks.map((task) => (
                            isSameDay(task.startDate, day) && (
                                <TaskWithPopover key={task.id}  task={task} setSelectedTaskForEdit={setSelectedTaskForEdit} setSelectedTaskForDelete={setSelectedTaskForDelete}/>  
                            )
                        ))}
                    </Popover.Body>
                </Popover>

            </Overlay>

        </>
    )
}