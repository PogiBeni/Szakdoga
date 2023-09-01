import DatePickerPopover from "../Popovers/DatePickerPopover";
import { useState } from "react";
import { format } from 'date-fns';
import ColorPickerPopover from "../Popovers/ColorPickerPopover";

export default function AddEventModal() {
    const [showStartPicker, setShowStartPicker] = useState(false)
    const [showEndPicker, setShowEndPicker] = useState(false)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [target, setTarget] = useState({

        color: null,
        startDate: null,
        endDate: null
    })
    const [event, setEvent] = useState(
        {
            name: "",
            color: '#4169E1',
            startDate: new Date(),
            startTime: "",
            endDate: new Date(),
            endTime: ""
        })


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
        setEvent({ ...event, startDate: selectedDate });
    }
    function handleEndDatePickerSelection(selectedDate) {
        setEvent({ ...event, endDate: selectedDate });
    }
    function handleColorPickerPickerSelection(selectedColor) {
        setEvent({ ...event, color: selectedColor })
    }


    return (
        <div className="modal fade" id="addEventModal" tabIndex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header  bg-dark text-white" data-bs-theme="dark">
                        <h1 className="modal-title fs-5 " id="addEventModalLabel">Add event</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center flex-column">
                        <form className="d-flex  flex-column mt-3" >

                            <div className="d-flex  mt-3">
                                <div>
                                    <div type="text" className="form-control me-2 ms-2 "
                                        onClick={(e) => { handleShowColorPicker(e) }}
                                        style={{
                                            backgroundColor: event.color,
                                            width: '3.7rem',
                                            height: '3.7rem',

                                        }} />
                                </div>
                                <div className="form-floating mb-1 w-auto">
                                    <input type="text" className="form-control me-2 ms-2 " id="eventName" value={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} placeholder="Event name" aria-label="Event name" aria-describedby="addon-wrapping" />
                                    <label htmlFor="eventName">Event name</label>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-3">

                                <div className="form-floating me-2">
                                    <input type="text" className="form-control m-2 ms-2 " id="startDate" value={format(event.startDate, "yyyy/MM/dd")}
                                        readOnly={true}
                                        placeholder="YYYY/MM/DD" aria-label="Event name" aria-describedby="addon-wrapping"
                                        onClick={(e) => { handleShowStartDatePicker(e) }} />
                                    <label htmlFor="startDate">Start date:</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control m-2 ms-2 " id="startTime" placeholder="Start time:"
                                        value={event.startTime} onChange={(e) => setEvent({ ...event, startTime: e.target.value })}
                                        onBlur={() => {
                                            if (event.startTime.length === 2 || event.startTime.length === 1) {
                                                setEvent({ ...event, startTime: event.startTime + ":00" });
                                            }
                                        }}
                                    />
                                    <label htmlFor="startDate">Start time:</label>
                                </div>

                            </div>

                            <div className="d-flex align-items-center mb-3">
                                <div className="form-floating me-2">
                                    <input type="text" className="form-control m-2 ms-2 " id="endDate" value={format(event.endDate, "yyyy/MM/dd")}
                                        readOnly={true}
                                        placeholder="YYYY/MM/DD" aria-label="Event name" aria-describedby="addon-wrapping"
                                        onClick={(e) => { handleShowEndDatePicker(e) }} />
                                    <label htmlFor="startDate">End date:</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control m-2 ms-2 " id="endTime" placeholder="End time:"
                                        value={event.endTime} onChange={(e) => setEvent({ ...event, endTime: e.target.value })}
                                        onBlur={() => {
                                            if (event.endTime.length === 2 || event.endTime.length === 1) {
                                                setEvent({ ...event, endTime: event.endTime + ":00" });
                                            }
                                        }}
                                    />
                                    <label htmlFor="startDate">End time:</label>
                                </div>
                            </div>
                            <DatePickerPopover show={showStartPicker} target={target.startDate} onHide={() => setShowStartPicker(false)} placement={"left"} onDateSelect={handleStartDatePickerSelection} />
                            <DatePickerPopover show={showEndPicker} target={target.endDate} onHide={() => setShowEndPicker(false)} placement={"left"} onDateSelect={handleEndDatePickerSelection} />
                            <ColorPickerPopover show={showColorPicker} target={target.color} onHide={() => setShowColorPicker(false)} setColor={handleColorPickerPickerSelection} />

                            <textarea className="form-control m-2" placeholder="Description" aria-label="Description" aria-describedby="addon-wrapping" />

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