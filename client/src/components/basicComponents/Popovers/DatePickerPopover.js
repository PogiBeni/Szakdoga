import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useState } from 'react';

export default function DatePickerPopover({ show, target, onHide, placement, onDateSelect }) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });
    const [latestSelectedDate, setLatestSelectedDate] = useState(null);

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
                    <div className="d-flex justify-content-between mb-3">
                        <button className='btn btn-dark btn-sm ' onClick={prevMonth}>&lt;</button>

                        <h5>{format(currentDate, 'MMMM yyyy')}</h5>

                        <button className='btn btn-dark btn-sm ' onClick={nextMonth}>&gt;</button>
                    </div>
                    <div className='calendarGrid'>
                        {
                            daysInMonth.map((day) => (

                                <div
                                    key={day}
                                    className={`miniCalendarDay ${isSameDay(day, new Date()) ? 'bg-dark text-white' : ''
                                        } ${isSameDay(latestSelectedDate, day) ? 'bg-success text-white' : ''}`}
                                    onClick={() => {onDateSelect(day); setLatestSelectedDate(day)}}
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