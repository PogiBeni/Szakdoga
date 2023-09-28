import { useState, useContext, useEffect } from "react";
import { isSameDay, parseISO } from 'date-fns';
import { addTask } from "../../../apiCalls/ApiCalls";
import { UserContext } from "../../Context/UserContext";
import ColorPicker from "../../basicComponents/ColorPicker";
import ErrorMsg from "../../basicComponents/ErrorMsg";
import InputWithLabel from "../../basicComponents/InputWithLabel";
import Datepicker from "../../basicComponents/DatePicker";
import TimeInput from "../../basicComponents/TimeInput";
import BasicModal from "../../basicComponents/BasicModal";
import LabelSelect from "../MainBodyComponents/LableSelect";
import SelectGroupInput from "../MainBodyComponents/SelectGroupInput";


export default function AddTaskModal() {
    const [user, setUser] = useContext(UserContext)
    const [errorMSG, setErrorMSG] = useState(null)
    const [task, setTask] = useState({
        id: null,
        creatorId: null,
        taskName: "",
        color: '#4169E1',
        groupId: null,
        label: null,
        startDate: new Date(),
        startTime: "",
        endDate: new Date(),
        endTime: "",
        desc: ""
    })

    useEffect(() => {
        setTask({ ...task, creatorId: user.id })
    }, [user]);

    function handleTaskSubmit(e) {
        e.preventDefault()

        console.log(task)
        if (task.taskName === "") { setErrorMSG("Fill out the name!"); return }
        if (task.startTime === "") { setErrorMSG("Set a start time!"); return }
        if (task.endTime === "") { setErrorMSG("Set an end time!"); return }
        if (task.startDate > task.endDate) { setErrorMSG("Start date must be before the end date!"); return }
        if (isSameDay(task.startDate, task.endDate) && task.startTime.split(':')[0] > task.endTime.split(':')[0]) { setErrorMSG("Start time must be before the end time!"); return }
        if (task.startTime.split(':')[0] > 25 || task.endTime.split(':')[0] > 25) { setErrorMSG("Time hours must be between 0-24!"); return }
        if (task.startTime.split(':')[1] > 60 || task.endTime.split(':')[1] > 60) { setErrorMSG("Time minutes must be between 0-24!"); return }
        if (task.desc === "") { setErrorMSG("Give a description!"); return }

        addTask(task).then((data) => {

            setErrorMSG(null);
            document.querySelector('#dismissAddTaskModal').click();
            const newData = { ...data, startDate: parseISO(data.startDate), endDate: parseISO(data.endDate), groupId: parseInt(data.groupId) }
            setUser({ ...user, tasks: [...user.tasks, newData] });
            setTask({
                ...task,
                taskName: "",
                groupId: null,
                startTime: "",
                endTime: "",
                description: ""
            });
        })
    }

    return (
        <BasicModal name={"addTaskModal"} title={"Add task:"} centered={true}>

            <form onSubmit={handleTaskSubmit} className="d-flex  flex-column mt-3" >
                <ErrorMsg errorMSG={errorMSG} />
                <div className="d-flex  mt-3">
                    <ColorPicker color={task.color} setTaskColor={(selectedColor) => setTask({ ...task, color: selectedColor })} className="d-flex" />
                    <InputWithLabel label={"Task name:"} addClassName={"mb-1 w-100"}>
                        <input type="text"
                            className="form-control "
                            value={task.taskName}
                            onChange={(e) => setTask({ ...task, taskName: e.target.value })}
                            placeholder="Task name" aria-label="Task name" />
                    </InputWithLabel>
                </div>


                <div className="d-flex align-items-center mt-3 mb-3">
                    <InputWithLabel label={"Start date:"} addClassName={"me-2"}>
                        <Datepicker date={task.startDate} handleDatePickerSelection={(selectedDate) => setTask({ ...task, startDate: selectedDate })} />
                    </InputWithLabel>
                    <InputWithLabel label={"Start time:"}>
                        <TimeInput placeholder={"Start time"} value={task.startTime} setVariable={(time) => setTask({ ...task, startTime: time })} />
                    </InputWithLabel>
                </div>

                <div className="d-flex align-items-center mb-3">
                    <InputWithLabel label={"End date:"} addClassName={"me-2"}>
                        <Datepicker date={task.endDate} handleDatePickerSelection={(selectedDate) => setTask({ ...task, endDate: selectedDate })} />
                    </InputWithLabel>
                    <InputWithLabel label={"End time:"}>
                        <TimeInput placeholder={"End time"} value={task.endTime} setVariable={(time) => setTask({ ...task, endTime: time })} />
                    </InputWithLabel>
                </div>
                <div className="d-flex align-items-center ">
                    <div className="w-50 me-2">
                        <SelectGroupInput setVariable={(selected) => setTask({...task, groupId: selected.value})}/>
                    </div>
                    <div className="w-50">
                        <LabelSelect setLabel={(selectedLabel) => setTask({ ...task, label: selectedLabel })} />
                    </div>
                </div>


                <InputWithLabel label={"Description:"} addClassName={"w-100 mt-3"}>
                    <textarea className="form-control" value={task.desc} onChange={(e) => setTask({ ...task, description: e.target.value })} placeholder="Description" aria-label="Description" />
                </InputWithLabel>

                <div className="d-flex align-items-center mt-5 ">
                    <button type="button" className="btn alert alert-light me-2 p-2" id="dismissAddTaskModal" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn alert alert-success me-2 p-2">Add</button>
                </div>
            </form>
        </BasicModal>
    )
}