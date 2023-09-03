import DatePickerPopover from "../Popovers/DatePickerPopover";
import { useState, useContext, useEffect } from "react";
import { format, isSameDay } from 'date-fns';
import ColorPickerPopover from "../Popovers/ColorPickerPopover";
import { addTask } from "../../../apiCalls/ApiCalls";
import { UserContext } from "../../Context/UserContext";

export default function AddTaskModal() {
    const [showStartPicker, setShowStartPicker] = useState(false)
    const [showEndPicker, setShowEndPicker] = useState(false)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [user, setUser] = useContext(UserContext)

    const [target, setTarget] = useState({

        color: null,
        startDate: null,
        endDate: null
    })
    const [task, setTask] = useState(
        {

            creatorId: "",
            taskName: "",
            color: '#4169E1',
            startDate: new Date(),
            startTime: "",
            endDate: new Date(),
            endTime: "",
            desc: ""
        })
    useEffect(() => {
        setTask({ ...task, creatorId: user.id })
    }, [user])

    function handleShowStartDatePicker(e) {
        setShowStartPicker(!showStartPicker)
        setTarget({ ...target, startDate: e.target })
    }
    function handleShowEndDatePicker(e) {
        setShowEndPicker(!showEndPicker)
        setTarget({ ...target, endDate: e.target })
    }
    function handleShowColorPicker(e) {
        setShowColorPicker(!showColorPicker)
        setTarget({ ...target, color: e.target })
    }

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
        if (isSameDay(task.startDate, task.endDate) && task.startTime > task.endTime) { setErrorMSG("Start time must be before the end time!"); return }
        if (task.desc === "") { setErrorMSG("Give a description!"); return }

        addTask(task)
        setErrorMSG(null)
        document.querySelector('#btnCloseAddTask').click()
        setUser({...user,tasks:[...user.tasks,task]})
    }

    return (
        <div className="modal fade" id="addEventModal" tabIndex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header  bg-dark text-white" data-bs-theme="dark">
                        <h1 className="modal-title fs-5 " id="addEventModalLabel">Add event</h1>
                        <button type="button" id="btnCloseAddTask" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center flex-column">

                        <form onSubmit={handleTaskSubmit} className="d-flex  flex-column mt-3" >
                            {errorMSG ?
                                <div className="alert alert-danger form-control p-2" role="alert">
                                    {errorMSG}
                                </div>
                                : ""}
                            <div className="d-flex  mt-3">
                                <div>
                                    <div type="text" className="form-control me-2 ms-2 "
                                        onClick={(e) => { handleShowColorPicker(e) }}
                                        style={{
                                            backgroundColor: task.color,
                                            width: '3.7rem',
                                            height: '3.7rem',

                                        }} />
                                </div>
                                <div className="form-floating mb-1 w-auto">
                                    <input type="text" className="form-control me-2 ms-2 " id="taskName" value={task.taskName} onChange={(e) => setTask({ ...task, taskName: e.target.value })} placeholder="Task name" aria-label="Task name" aria-describedby="addon-wrapping" />
                                    <label htmlFor="taskName">Task name</label>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-3">

                                <div className="form-floating me-2">
                                    <input type="text" className="form-control m-2 ms-2 " id="startDate" value={format(task.startDate, "yyyy/MM/dd")}
                                        readOnly={true}
                                        placeholder="YYYY/MM/DD"
                                        onClick={(e) => { handleShowStartDatePicker(e) }} />
                                    <label htmlFor="startDate">Start date:</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control m-2 ms-2 " id="startTime" placeholder="Start time:"
                                        value={task.startTime} onChange={(e) => setTask({ ...task, startTime: e.target.value })}
                                        onBlur={() => {
                                            if (task.startTime.length === 2 || task.startTime.length === 1) {
                                                setTask({ ...task, startTime: task.startTime + ":00" });
                                            }
                                        }}
                                    />
                                    <label htmlFor="startDate">Start time:</label>
                                </div>

                            </div>

                            <div className="d-flex align-items-center mb-3">
                                <div className="form-floating me-2">
                                    <input type="text" className="form-control m-2 ms-2 " id="endDate" value={format(task.endDate, "yyyy/MM/dd")}
                                        readOnly={true}
                                        placeholder="YYYY/MM/DD"
                                        onClick={(e) => { handleShowEndDatePicker(e) }} />
                                    <label htmlFor="startDate">End date:</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control m-2 ms-2 " id="endTime" placeholder="End time:"
                                        value={task.endTime} onChange={(e) => setTask({ ...task, endTime: e.target.value })}
                                        onBlur={() => {
                                            if (task.endTime.length === 2 || task.endTime.length === 1) {
                                                setTask({ ...task, endTime: task.endTime + ":00" });
                                            }
                                        }}
                                    />
                                    <label htmlFor="startDate">End time:</label>
                                </div>
                            </div>
                            <DatePickerPopover show={showStartPicker} target={target.startDate} onHide={() => setShowStartPicker(false)} placement={"left"} onDateSelect={handleStartDatePickerSelection} />
                            <DatePickerPopover show={showEndPicker} target={target.endDate} onHide={() => setShowEndPicker(false)} placement={"left"} onDateSelect={handleEndDatePickerSelection} />
                            <ColorPickerPopover show={showColorPicker} target={target.color} onHide={() => setShowColorPicker(false)} setColor={handleColorPickerPickerSelection} />

                            <div className="form-floating mb-1 w-auto">
                                <textarea className="form-control m-2" id="desc" value={task.desc} onChange={(e) => setTask({ ...task, desc: e.target.value })} placeholder="Description" aria-label="Description" aria-describedby="addon-wrapping" />
                                <label htmlFor="desc">Description</label>
                            </div>

                            <div className="d-flex align-items-center mt-5 ">
                                <button type="button" className="btn alert alert-light me-2 p-2" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn alert alert-success me-2 p-2">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}