import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import EventPopover from './Popovers/EventPopover';
import AddEventModal from './Modals/AddEventModal';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const events = [
        { title: 'Event 1', color: 'red', start: new Date() },
        { title: 'Kutya séta', color: 'red', start: new Date() },
        { title: 'Kutya séta', color: 'red', start: new Date() },
        { title: 'Test', color: 'red', start: new Date(2023, 7, 9) },
        { title: 'Kutya séta', color: 'red', start: new Date(2023, 6, 9) },
        { title: '911', color: 'red', start: new Date(2023, 8, 11) },
        { title: 'test', color: 'red', start: new Date(2023, 8, 11) },
        { title: 'test2', color: 'red', start: new Date(2023, 8, 11) },
        { title: 'test3', color: 'red', start: new Date(2023, 8, 11) },

    ];
    function prevMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    function nextMonth() {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });

    return (
        <div>
            <div className="calendarHeader">
                <div>
                    <button className='btn btn-dark btn-sm me-1' onClick={prevMonth}>&lt;</button>
                    <button className='btn btn-dark btn-sm me-1 ' onClick={nextMonth}>&gt;</button>
                    <button className='btn btn-success btn-sm me-1' data-bs-toggle="modal" data-bs-target="#addEventModal">+</button>
                </div>
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <div />
            </div>

            <div className="calendarGrid">
                {daysInMonth.map((day) => (
                    <div key={day} className={`calendarDay ${isSameDay(day, new Date()) ? 'bg-dark text-white' : ''}`}>
                        <div >{format(day, 'd')}</div>
                        <div>
                            {events.filter((event) => isSameDay(event.start, day)).length > 2 ?

                                <EventPopover events={events} clickedDay={day}  />
                                :
                                events.map((event) => (
                                    isSameDay(event.start, day) && (
                                        <div key={event.title} className="event">
                                            {event.title}
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
            <AddEventModal />

        </div>
    );
}
