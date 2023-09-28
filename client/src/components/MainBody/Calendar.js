import { useState, useContext, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import TaskPopover from './Popovers/TaskPopover';
import AddTaskModal from './Modals/AddTaskModal';
import { UserContext } from '../Context/UserContext';
import BasicDay from '../basicComponents/BasicDay';
import GroupModal from './Modals/GroupModal';
import FilterSelect from './MainBodyComponents/FilterSelect';
import TaskWithPopover from './Popovers/TaskWithPopover';
import FilteredDataDiv from './MainBodyComponents/FilteredDataDiv';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [user, setUser] = useContext(UserContext)
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState();
    const [selectedOptions, setSelectedOptions] = useState([]);

    function prevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }
    function nextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });



    return (
        <div className='w-100 '>
            <div className="d-flex justify-content-between m-3" >
                <div className="w-25">
                    <button className='btn btn-dark btn-sm me-1' onClick={prevMonth}>&lt;</button>
                    <button className='btn btn-dark btn-sm me-1 ' onClick={nextMonth}>&gt;</button>
                    <button className='btn btn-success btn-sm me-1' data-bs-toggle="modal" data-bs-target="#addTaskModal">+</button>
                    <button className='btn btn-light me-1' data-bs-toggle="modal" data-bs-target="#addGroupModal"><img src="/icons/group.svg" /></button>
                </div>

                <h2 >{format(currentDate, 'MMMM yyyy')}</h2>

                <div className='w-25'>
                    <FilterSelect selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} setFilteredTasks={setFilteredTasks} />
                </div>
            </div>

            <div className="calendarGrid m-3">
                {selectedOptions.length == 0
                    ?
                    daysInMonth.map((day) => (
                        <BasicDay key={day} day={day}>

                            {
                                user.tasks.filter((task) => isSameDay(task.startDate, day)).length > 2 ?
                                    <TaskPopover tasks={user.tasks} day={day} />
                                    :
                                    user.tasks.map((task) => (
                                        isSameDay(task.startDate, day) && (
                                            <TaskWithPopover task={task} key={task.id}/>
                                        )
                                    ))

                            }
                        </BasicDay>
                    ))
                    : filteredTasks.map((task) => (

                        <FilteredDataDiv task={task} key={task.id} />

                    ))
                }
            </div>
            <GroupModal />
            <AddTaskModal />
        </div>
    );
}
