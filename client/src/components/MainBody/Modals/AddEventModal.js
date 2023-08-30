import DatePickerPopover from "../Popovers/DatePickerPopover";
import { useState, useRef } from "react";
import { format, parse } from 'date-fns';

export default function AddEventModal() {
    const [showStartPicker, setShowStartPicker] = useState(false)
    const [showEndPicker, setShowEndPicker] = useState(false)
    const [target, setTarget] = useState(null)
    const [event, setEvent] = useState(
        {
            name: "",
            startDate: new Date(),
            startTime: "",
            endDate: new Date(),
            endTime: ""
        })


    function handleShowStartDatePicker(e) {
        setShowStartPicker(!showStartPicker)
        setTarget(e.target)
    }
    function handleShowEndDatePicker(e) {
        setShowEndPicker(!showEndPicker)
        setTarget(e.target)
    }
    function handleStartDatePickerSelection(selectedDate) {
        setEvent({ ...event, startDate: selectedDate });
    }
    function handleEndDatePickerSelection(selectedDate) {
        setEvent({ ...event, endDate: selectedDate });
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
                        <form className="d-flex align-items-center flex-column mt-3" >

                            <div className="form-floating mb-1">
                                <input type="text" className="form-control me-2 ms-2 " id="eventName" value={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} placeholder="Event name" aria-label="Event name" aria-describedby="addon-wrapping" />
                                <label htmlFor="eventName">Event name</label>
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
                                    />
                                    <label htmlFor="startDate">End time:</label>
                                </div>
                            </div>
                            <DatePickerPopover show={showStartPicker} target={target} onHide={() => setShowStartPicker(false)} placement={"left"} onDateSelect={handleStartDatePickerSelection} />
                            <DatePickerPopover show={showEndPicker} target={target} onHide={() => setShowEndPicker(false)} placement={"left"} onDateSelect={handleEndDatePickerSelection} />
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