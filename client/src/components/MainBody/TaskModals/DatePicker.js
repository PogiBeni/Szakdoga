import "./TaskModal.css"
import { useState } from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export default function Datepicker({ date, handleDatePickerSelection }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });
    const [latestSelectedDate, setLatestSelectedDate] = useState(null);

    function prevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    function nextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const datePickerPopover = (
        <Popover className='DatePicker'>
            <Popover.Header className='eventHeader' as="h3">{`Pick a date:`}</Popover.Header>
            <Popover.Body>
                <div className="d-flex justify-content-between mb-3">
                    <button className='btn btn-dark btn-sm ' onClick={prevMonth}>&lt;</button>
                    <h5>{format(currentDate, 'MMMM yyyy')}</h5>
                    <button className='btn btn-dark btn-sm ' onClick={nextMonth}>&gt;</button>
                </div>
                <div className='calendarGrid'>
                    {daysInMonth.map((day) => (
                        <div
                            key={day}
                            className={`miniCalendarDay ${isSameDay(day, new Date()) ? 'bg-dark text-white' : ''
                                } ${isSameDay(latestSelectedDate, day) ? 'bg-success text-white' : ''}`}
                            onClick={() => { handleDatePickerSelection(day); setLatestSelectedDate(day) }}>
                            {format(day, 'd')}
                        </div>
                    ))}
                </div>
            </Popover.Body>
        </Popover>
    )

    return (
        <OverlayTrigger trigger="click" placement="left" rootClose="true" overlay={datePickerPopover} >
            <input type="text" className="form-control" value={format(date, "yyyy/MM/dd")}
                readOnly={true}
                placeholder="YYYY/MM/DD" />
        </OverlayTrigger>
    )
}