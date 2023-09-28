import { format,isSameDay } from 'date-fns';
export default function FilteredDataDiv({ task }) {
    const today = new Date()
    const bodyClass = (isSameDay(task.startDate, today) ?" card border border-warning border-2 rounded"  : "card")
    return(
        <div className={bodyClass} style={{ width: "13rem" }}>
            <h5 className="card-title p-2 ps-3 mb-0 rounded-top-1" style={{ backgroundColor: task.color, color:"white" }}>{task.taskName}</h5>
            <div className="card-body p-2" >

                <div className="d-flex align-items-center mb-1 mt-2">
                    <img src="/icons/calendarDark.svg" className='me-3' />
                    <div className="form-text mt-0 " >
                        <div > <strong>{format(task.startDate, 'MMMM dd')} </strong></div>
                        <div>{task.startTime} - {task.endTime}</div>
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
            </div>
        </div>
    )
}