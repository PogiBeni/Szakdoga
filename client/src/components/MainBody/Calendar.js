import React, { useState, useRef } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import EventPopover from './Popovers/EventPopover';

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

    ];
    const [showEvent, setShowEvent] = useState(false)
    const [clickedDay, setClickedDay] = useState(null)
    const [target, setTarget] = useState(null)
    const ref = useRef(null)


    function prevMonth(){
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    function nextMonth(){
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });

    function handleShowEvents(day,e)
    {
        setShowEvent(!showEvent)
        setClickedDay(day) 
        setTarget(e.target)
    }

    return (
        <div>
            <div className="calendarHeader">
                <button className='btn btn-dark' onClick={prevMonth}>Previous</button>
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <button className='btn btn-dark' onClick={nextMonth}>Next</button>
            </div>

            <div className="calendarGrid">
                {daysInMonth.map((day) => (
                    <div key={day} className={`calendarDay ${isSameDay(day, new Date()) ? 'bg-dark text-white' : ''}`}>
                        <div >{format(day, 'd')}</div>
                        <div>
                            {events.filter((event) => isSameDay(event.start, day)).length > 2 ?

                                <div className="event" ref={target} onClick={(e) => handleShowEvents(day,e)}>
                                    {events.filter((event) => isSameDay(event.start, day)).length} events
                                </div>
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
            <EventPopover events={events} clickedDay={clickedDay} show={showEvent} target={target} ref={ref} onHide={() => setShowEvent(false)}/>
        </div>
    );
}
