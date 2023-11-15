import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { isSameDay } from 'date-fns';
import TaskWithPopover from './TaskWithPopover';

export default function TaskPopover({ tasks, day, setSelectedTaskForEdit, setSelectedTaskForDelete }) {
    var placementVar
    if (day) {
        if (day.getDate() >= 21) {
            placementVar = "top"
        }
        else placementVar = "bottom"
    }

    const taskPopover = (
        <Popover >
            <Popover.Header style={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}>{`Events:`}</Popover.Header>
            <Popover.Body>
                {tasks.map((task) => (
                    isSameDay(task.startDate, day) && (
                        <TaskWithPopover key={task.id} task={task} setSelectedTaskForEdit={setSelectedTaskForEdit} setSelectedTaskForDelete={setSelectedTaskForDelete} />
                    )
                ))}
            </Popover.Body>
        </Popover>
    )

    return (
            <OverlayTrigger trigger="click"
                placement={placementVar}
                rootClose="true"
                overlay={taskPopover}
                containerPadding={20}>
                <div className="event" style={{ backgroundColor: "red" }}>
                    {tasks.filter((task) => isSameDay(task.startDate, day)).length} events
                </div>
            </OverlayTrigger>
    )
}