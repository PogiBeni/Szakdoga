import { useState, useEffect, useContext } from "react";
import { editTask } from "../../../apiCalls/ApiCalls";
import ColorPicker from "../../basicComponents/ColorPicker";
import ErrorMsg from "../../basicComponents/ErrorMsg";
import InputWithLabel from "../../basicComponents/InputWithLabel";
import Datepicker from "../../basicComponents/DatePicker";
import TimeInput from "../../basicComponents/TimeInput";
import BasicModal from "../../basicComponents/BasicModal";
import LabelSelect from "../MainBodyComponents/LableSelect";
import SelectGroupInput from "../MainBodyComponents/SelectGroupInput";
import { UserContext } from "../../Context/UserContext";

export default function EditTaskModal({ selectedTaskForEdit }) {

    const [user, setUser] = useContext(UserContext)
    const [errorMSG, setErrorMSG] = useState(null)
    const [selectedGroupOption, setSelectedGroupOption] = useState(null)
    const [selectedLabelOption, setSelectedLabelOption] = useState(null)
    const [task, setTask] = useState()

    useEffect(() => {
        if (selectedTaskForEdit) {
            setTask(selectedTaskForEdit);
            if (selectedTaskForEdit.groupId)
                setSelectedGroupOption({ value: selectedTaskForEdit.groupId, label: selectedTaskForEdit.groupName })
            else setSelectedGroupOption(null)
            if (selectedTaskForEdit.label)
                setSelectedLabelOption({ value: selectedTaskForEdit.label, label: selectedTaskForEdit.label })
            else setSelectedLabelOption(null)
        }
    }, [selectedTaskForEdit]);


    function handleTaskSubmit(e) {
        e.preventDefault()

        console.log(task)
        if (task.taskName === "") { setErrorMSG("Fill out the name!"); return }
        if (task.startTime === "") { setErrorMSG("Set a start time!"); return }
        if (task.startDate > task.endDate) { setErrorMSG("Start date must be before the end date!"); return }
        if (task.startTime.split(':')[0] > 25) { setErrorMSG("Time hours must be between 0-24!"); return }
        if (task.startTime.split(':')[1] > 60) { setErrorMSG("Time minutes must be between 0-60!"); return }
        if (task.desc === "") { setErrorMSG("Give a description!"); return }

        if (!task.country) setTask({ ...task, locationId: null })
        console.log(task)
        editTask(task).then(() => {

            setErrorMSG(null)
            setTask(null)
            document.querySelector('#dismissEditTaskModal').click();

            setUser((prevUser) => {
                const updatedTasks = prevUser.tasks.map((filterTask) => {
                    if (filterTask.id === task.id) {
                        return { ...filterTask, ...task };
                    }
                    return filterTask;
                });
                return { ...prevUser, tasks: updatedTasks };
            });
            console.log(user)
        })
    }

    return (
        <BasicModal name={"editTaskModal"} title={"Edit task:"} centered={true} size={"modal-dialog-scrollable"}>
            {task &&
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
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Location data
                                </button>
                            </h2>
                            <div id="collapseOne" className={`accordion-collapse ${task.country ? "" : "collapse"}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body me-1 p-2 d-flex align-items-center w-100" >
                                    <InputWithLabel label={"Country:"} >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={task.country}
                                            onChange={(e) =>
                                                setTask({ ...task, country: e.target.value })
                                            }
                                            placeholder="Country"
                                            aria-label="Country"
                                        />
                                    </InputWithLabel>
                                    <InputWithLabel label={"City Name:"} addClassName={"ms-2"}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={task.cityName}
                                            onChange={(e) =>
                                                setTask({ ...task, cityName: e.target.value })
                                            }
                                            placeholder="City Name"
                                            aria-label="City Name"
                                        />
                                    </InputWithLabel>

                                    <InputWithLabel label={"Street Name:"} addClassName={"ms-2"}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={task.streetName}
                                            onChange={(e) =>
                                                setTask({ ...task, streetName: e.target.value })
                                            }
                                            placeholder="Street Name"
                                            aria-label="Street Name"
                                        />
                                    </InputWithLabel>
                                </div>
                            </div>
                        </div>
                    </div>

                    <InputWithLabel label={"Description:"} addClassName={"w-100 mt-3"}>
                        <textarea className="form-control" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} placeholder="Description" aria-label="Description" />
                    </InputWithLabel>

                    <div className="d-flex align-items-center mt-3 ">
                        <button type="button" className="btn alert alert-light me-2 p-2" id="dismissEditTaskModal" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn alert alert-success me-2 p-2">Add</button>
                    </div>
                </form>}
        </BasicModal>
    )
}