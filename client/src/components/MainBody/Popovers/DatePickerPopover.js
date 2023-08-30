import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useState } from 'react';

export default function DatePickerPopover({ show, target,  onHide, placement ,onDateSelect}) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });
    function prevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    function nextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    return (


        <Overlay
            show={show}
            target={target}
            placement={placement}
            containerPadding={20}
            rootClose="true"
            onHide={onHide}
            transition={false}
        >
            <Popover className='DatePicker'>
                <Popover.Header className='eventHeader' as="h3">{`Pick a date:`}</Popover.Header>
                <Popover.Body>
                    <div className="calendarHeader">
                        <button className='btn btn-dark btn-sm me-3' onClick={prevMonth}>&lt;</button>

                        <h5>{format(currentDate, 'MMMM yyyy')}</h5>

                        <button className='btn btn-dark btn-sm ms-3' onClick={nextMonth}>&gt;</button>
                    </div>
                    <div className='calendarGrid'>
                        {

                            daysInMonth.map((day) => (

                                <div key={day}
                                    className={`miniCalendarDay ${isSameDay(day, new Date()) ? 'bg-dark text-white' : ""}`}
                                    onClick={() => onDateSelect(day)}
                                >
                                    {format(day, 'd')}
                                </div>
                            ))}

                    </div>
                </Popover.Body>
            </Popover>

        </Overlay>
    )
}