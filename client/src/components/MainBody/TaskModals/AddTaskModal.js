import React from "react";
import { parseISO } from 'date-fns';
import { addTask } from "../../../apiCalls/ApiCalls";
import { UserContext } from "../../Context/UserContext";
import ColorPicker from "./ColorPicker"
import Datepicker from "./DatePicker";
import LabelSelect from "./LableSelect";
import SelectGroupInput from "./SelectGroupInput";

import ErrorMsg from "../../BasicComponents/ErrorMsg";
import InputWithLabel from "../../BasicComponents/InputWithLabel";
import TimeInput from "./TimeInput";
import BasicModal from "../../BasicComponents/BasicModal";
import TodoList from "./TodoList";


export default function AddTaskModal() {
    const [user, setUser] = React.useContext(UserContext)
    const [errorMSG, setErrorMSG] = React.useState(null)
    const [selectedGroupOption, setSelectedGroupOption] = React.useState(null)
    const [selectedLabelOption, setSelectedLabelOption] = React.useState(null)
    const [task, setTask] = React.useState({
        id: null,
        creatorId: null,
        taskName: "",
        color: '#4169E1',
        groupId: null,
        groupName: null,
        label: null,
        startDate: new Date(),
        startTime: "",
        description: "",
        locationId: null,
        notify: true
    })
    const [location, setLocation] = React.useState({
        country: "",
        cityName: "",
        streetName: "",
    });
    const [subtasks, setSubtasks] = React.useState([]);

    React.useEffect(() => {
        setTask({ ...task, creatorId: user.id })
    }, [user]);

    function handleTaskSubmit(e) {
        e.preventDefault()

        if (task.taskName === "") { setErrorMSG("Fill out the name!"); return }
        if (task.startTime === "") { setErrorMSG("Set a start time!"); return }
        if (task.startTime.split(':')[0] > 25) { setErrorMSG("Time hours must be between 0-24!"); return }
        if (task.startTime.split(':')[1] > 60) { setErrorMSG("Time minutes must be between 0-60!"); return }
        if (task.desc === "") { setErrorMSG("Give a description!"); return }

        const isLocationFilled = location.country || location.cityName || location.streetName;

        if (!isLocationFilled) {
            setLocation("");
        } else {
            if (!location.country || !location.cityName || !location.streetName) {
                setErrorMSG("Fill out all location fields!");
                return;
            }
        }


        var taskData = { task: task, location: location, subtasks: subtasks }
        addTask(taskData).then((data) => {

            setErrorMSG(null);
            document.querySelector('#dismissAddTaskModal').click();
            const newData = { ...data, startDate: parseISO(data.startDate), groupId: parseInt(data.groupId), country: location.country, cityName: location.cityName, streetName: location.streetName }
            setUser({ ...user, tasks: [...user.tasks, newData] });
            setTask({
                ...task,
                taskName: "",
                groupId: null,
                groupName: null,
                startTime: "",
                description: ""
            });
            setSubtasks([])
            setLocation({ country: "", cityName: "", streetName: "" })
            setSelectedGroupOption(null)
        })
    }

    return (
        <BasicModal name={"addTaskModal"} title={"Add task:"} centered={true} size={"modal-dialog-scrollable"}>

            <form onSubmit={handleTaskSubmit} className="d-flex  flex-column mt-1" style={{ width: "28rem" }}>
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
                    <InputWithLabel label={"Start date:"} addClassName={"me-2 w-50"}>
                        <Datepicker date={task.startDate} handleDatePickerSelection={(selectedDate) => setTask({ ...task, startDate: selectedDate })} />
                    </InputWithLabel>
                    <InputWithLabel label={"Start time:"} addClassName={"w-50"}>
                        <TimeInput placeholder={"Start time"} value={task.startTime} setVariable={(time) => setTask({ ...task, startTime: time })} />
                    </InputWithLabel>
                </div>

                <div className="d-flex align-items-center ">
                    <div className="w-50 me-2">
                        <SelectGroupInput setVariable={(selected) => setTask({ ...task, groupId: selected.value, groupName: selected.label })} selectedOptions={selectedGroupOption} setSelectedOptions={setSelectedGroupOption} />
                    </div>
                    <div className="w-50">
                        <LabelSelect setLabel={(selectedLabel) => setTask({ ...task, label: selectedLabel })} selectedOption={selectedLabelOption} setSelectedOption={setSelectedLabelOption} />
                    </div>
                </div>

                <div className="accordion mt-3" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Location data
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body me-1 p-2 d-flex align-items-center w-100" >
                                <InputWithLabel label={"Country:"} >
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={location.country}
                                        onChange={(e) =>
                                            setLocation({ ...location, country: e.target.value })
                                        }
                                        placeholder="Country"
                                        aria-label="Country"
                                    />
                                </InputWithLabel>
                                <InputWithLabel label={"City Name:"} addClassName={"ms-2"}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={location.cityName}
                                        onChange={(e) =>
                                            setLocation({ ...location, cityName: e.target.value })
                                        }
                                        placeholder="City Name"
                                        aria-label="City Name"
                                    />
                                </InputWithLabel>

                                <InputWithLabel label={"Street Name:"} addClassName={"ms-2"}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={location.streetName}
                                        onChange={(e) =>
                                            setLocation({ ...location, streetName: e.target.value })
                                        }
                                        placeholder="Street Name"
                                        aria-label="Street Name"
                                    />
                                </InputWithLabel>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Sub tasks
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <TodoList subTasks={subtasks} setSubtasks={setSubtasks} /></div>
                        </div>
                    </div>
                </div>


                <InputWithLabel label={"Description:"} addClassName={"w-100 mt-3"}>
                    <textarea className="form-control" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} placeholder="Description" aria-label="Description" />
                </InputWithLabel>


                <div className="form-check form-switch mt-3">
                    <input className="form-check-input p-2" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                        checked={task.notify}
                        onChange={(e) =>
                            setTask({ ...task, notify: e.target.checked })
                        } />
                    <label className="form-check-label " htmlFor="flexSwitchCheckDefault">Notify me!</label>
                </div>

                <div className="d-flex align-items-center mt-3 ">
                    <button type="button" className="btn alert alert-light me-2 p-2" id="dismissAddTaskModal" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn alert alert-success me-2 p-2">Add</button>
                </div>
            </form>
        </BasicModal>
    )
}