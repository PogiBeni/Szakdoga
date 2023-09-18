import { useState, useContext } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import TaskPopover from './Popovers/TaskPopover';
import AddTaskModal from './Modals/AddTaskModal';
import { UserContext } from '../Context/UserContext';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [user, setUser] = useContext(UserContext)
    var tasks = user.tasks

    function prevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    function nextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });

    return (
        <>
            <div>
                <div className="calendarHeader" >
                    <div>
                        <button className='btn btn-dark btn-sm me-1' onClick={prevMonth}>&lt;</button>
                        <button className='btn btn-dark btn-sm me-1 ' onClick={nextMonth}>&gt;</button>
                        <button className='btn btn-success btn-sm me-1' data-bs-toggle="modal" data-bs-target="#addTaskModal">+</button>
                    </div>
                    <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                    <div />
                </div>

                <div className="calendarGrid">
                    {daysInMonth.map((day) => (
                        <div key={day} className={`calendarDay ${isSameDay(day, new Date()) ? 'bg-dark text-white' : ''}`}>
                            <div >{format(day, 'd')}</div>
                            <div>
                                {
                                    tasks.filter((task) => isSameDay(task.startDate, day)).length > 2 ?

                                        <TaskPopover tasks={tasks} day={day} />
                                        :
                                        tasks.map((task) => (
                                            isSameDay(task.startDate, day) && (
                                                <div
                                                    key={task.id}
                                                    className="event"
                                                    style={{ backgroundColor: task.color }}
                                                >
                                                    {task.taskName}
                                                </div>
                                            )
                                        ))
                                }
                            </div>
                        </div>
                    ))}

                    <AddTaskModal />
                </div>
            </div>
            
        </>
    );
}
