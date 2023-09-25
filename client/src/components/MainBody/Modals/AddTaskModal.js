import { useState, useContext, useEffect } from "react";
import { isSameDay } from 'date-fns';
import { addTask } from "../../../apiCalls/ApiCalls";
import { UserContext } from "../../Context/UserContext";
import ColorPicker from "../../basicComponents/ColorPicker";
import ErrorMsg from "../../basicComponents/ErrorMsg";
import InputWithLabel from "../../basicComponents/InputWithLabel";
import Datepicker from "../../basicComponents/DatePicker";
import TimeInput from "../../basicComponents/TimeInput";
import BasicModal from "../../basicComponents/BasicModal";


export default function AddTaskModal() {
    const [user, setUser] = useContext(UserContext)
    const [task, setTask] = useState({
        id: null,
        creatorId: "",
        taskName: "",
        color: '#4169E1',
        groupId: 0,
        startDate: new Date(),
        startTime: "",
        endDate: new Date(),
        endTime: "",
        desc: ""
    })
    useEffect(() => {
        setTask({ ...task, creatorId: user.id })
    }, [user])

    function handleStartDatePickerSelection(selectedDate) {
        setTask({ ...task, startDate: selectedDate });
    }
    function handleEndDatePickerSelection(selectedDate) {
        setTask({ ...task, endDate: selectedDate });
    }
    function handleColorPickerPickerSelection(selectedColor) {
        setTask({ ...task, color: selectedColor })
    }

    const [errorMSG, setErrorMSG] = useState(null)
    function handleTaskSubmit(e) {
        e.preventDefault()

        if (task.taskName === "") { setErrorMSG("Fill out the name!"); return }
        if (task.startTime === "") { setErrorMSG("Set a start time!"); return }
        if (task.endTime === "") { setErrorMSG("Set an end time!"); return }
        if (task.startDate > task.endDate) { setErrorMSG("Start date must be before the end date!"); return }
        if (isSameDay(task.startDate, task.endDate) && task.startTime.split(':')[0] > task.endTime.split(':')[0]) { setErrorMSG("Start time must be before the end time!"); return }
        if (task.startTime.split(':')[0] > 25 || task.endTime.split(':')[0] > 25) { setErrorMSG("Time hours must be between 0-24!"); return }
        if (task.startTime.split(':')[1] > 60 || task.endTime.split(':')[1] > 60) { setErrorMSG("Time minutes must be between 0-24!"); return }
        if (task.desc === "") { setErrorMSG("Give a description!"); return }

        addTask(task).then((data) => {
            const updatedTask = { ...task, id: data, groupId: parseInt(task.groupId) };
            setErrorMSG(null);
            document.querySelector('#dismissAddTaskModal').click();
            setUser({ ...user, tasks: [...user.tasks, updatedTask] });
            
            setTask({
                ...task,
                id: null,
                taskName: "",
                startTime: "",
                endTime: "",
                desc: ""
            });
        })
    }

    return (
        <BasicModal name={"addTaskModal"} title={"Add task:"} centered={true}>

            <form onSubmit={handleTaskSubmit} className="d-flex  flex-column mt-3" >
                <ErrorMsg errorMSG={errorMSG} />
                <div className="d-flex  mt-3">
                    <ColorPicker color={task.color} setTaskColor={handleColorPickerPickerSelection} className="d-flex" />
                    <InputWithLabel label={"Task name:"} addClassName={"mb-1 w-100"}>
                        <input type="text"
                            className="form-control "
                            value={task.taskName}
                            onChange={(e) => setTask({ ...task, taskName: e.target.value })}
                            placeholder="Task name" aria-label="Task name" />
                    </InputWithLabel>
                </div>

                <div className="d-flex align-items-center mt-3">
                    <InputWithLabel label={"Select group:"} addClassName={"me-2 w-50"}>
                        <select className="form-select" onChange={(e) => setTask({ ...task, groupId: e.target.value})}>
                            <option value="0">None</option>
                            {user.groups.map(group => (
                                <option key={group.id} value={group.id}>{group.groupName}</option>
                            ))}
                        </select>
                    </InputWithLabel>
                    <InputWithLabel label={"Select tag:"} addClassName={"me-2 w-50"}>
                        <input className="form-select" list="datalistOptions" />
                    </InputWithLabel>
                </div>

                <div className="d-flex align-items-center mt-3 mb-3">
                    <InputWithLabel label={"Start date:"} addClassName={"me-2"}>
                        <Datepicker date={task.startDate} handleDatePickerSelection={handleStartDatePickerSelection} />
                    </InputWithLabel>
                    <InputWithLabel label={"Start time:"}>
                        <TimeInput placeholder={"Start time"} value={task.startTime} setVariable={(time) => setTask({ ...task, startTime: time })} />
                    </InputWithLabel>
                </div>

                <div className="d-flex align-items-center mb-3">
                    <InputWithLabel label={"End date:"} addClassName={"me-2"}>
                        <Datepicker date={task.endDate} handleDatePickerSelection={handleEndDatePickerSelection} />
                    </InputWithLabel>
                    <InputWithLabel label={"End time:"}>
                        <TimeInput placeholder={"End time"} value={task.endTime} setVariable={(time) => setTask({ ...task, endTime: time })} />
                    </InputWithLabel>
                </div>

                <InputWithLabel label={"Description:"} addClassName={"w-100"}>
                    <textarea className="form-control" value={task.desc} onChange={(e) => setTask({ ...task, desc: e.target.value })} placeholder="Description" aria-label="Description" />
                </InputWithLabel>

                <div className="d-flex align-items-center mt-5 ">
                    <button type="button" className="btn alert alert-light me-2 p-2" id="dismissAddTaskModal" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn alert alert-success me-2 p-2">Add</button>
                </div>
            </form>
        </BasicModal>
    )
}