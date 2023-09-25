import { useState, useContext, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import TaskPopover from './Popovers/TaskPopover';
import AddTaskModal from './Modals/AddTaskModal';
import { UserContext } from '../Context/UserContext';
import Select from 'react-select';
import BasicDay from '../basicComponents/BasicDay';
import GroupModal from './Modals/GroupModal';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [user, setUser] = useContext(UserContext)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    const selectedValues = selectedOptions.map((option) => option.value);

    const handleSelectChange = (selectedValues) => {
        setSelectedOptions(selectedValues);
    };

    useEffect(() => {
        const updatedFilteredTasks = user.tasks.filter((task) =>
            selectedValues.includes(task.groupId)
        );
        setFilteredTasks(updatedFilteredTasks);
    }, [user.tasks, selectedOptions]);

    function prevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }
    function nextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });

    const options = user.groups.map((group) => ({
        value: group.id,
        label: group.groupName
    }))

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
                    <Select
                        isMulti
                        name="groups"
                        options={options}
                        className="basic-multi-select "
                        classNamePrefix="Groups"
                        onChange={handleSelectChange}
                        value={selectedOptions}
                    />
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
                        </BasicDay>
                    ))
                    : daysInMonth.map((day) => (
                        !filteredTasks.filter((task) => isSameDay(task.startDate, day)).length == 0 ?
                            <BasicDay day={day}>{
                                filteredTasks.filter((task) => isSameDay(task.startDate, day)).length > 2
                                    ?
                                    <TaskPopover tasks={filteredTasks} day={day} />
                                    :
                                    filteredTasks.map((task) => (
                                        isSameDay(task.startDate, day) && (

                                            <div
                                                key={task.id}
                                                className="event text-truncate"
                                                style={{ backgroundColor: task.color }}
                                            >
                                                {task.taskName}
                                            </div>
                                        )
                                    ))}
                            </BasicDay>
                            : null
                    ))}
            </div>
            <GroupModal />
            <AddTaskModal />
        </div>
    );
}
