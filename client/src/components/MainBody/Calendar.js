import React, { useState, useRef } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const events = [
        { title: 'Event 1', color: 'red', start: new Date(), end: new Date() },
        { title: 'Kutya séta', color: 'red', start: new Date(), end: new Date() },
        { title: 'Kutya séta', color: 'red', start: new Date(), end: new Date() },
        { title: 'Test', color: 'red', start: new Date(2023, 7, 9), end: new Date(2023, 8, 9) },
        { title: 'Kutya séta', color: 'red', start: new Date(2023, 6, 9), end: new Date(2023, 8, 9) },
        { title: '911', color: 'red', start: new Date(2023, 8, 11), end: new Date(2023, 8, 9) },
        { title: 'test', color: 'red', start: new Date(2023, 8, 11), end: new Date(2023, 8, 9) },
        { title: 'test2', color: 'red', start: new Date(2023, 8, 11), end: new Date(2023, 8, 9) },

    ];
    const [show, setShow] = useState(false);
    const [clickedDay, setClickedDay] = useState(null);
    const target = useRef(null);


    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });


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
                                <div key={day} className="event" ref={target} onClick={() => { setShow(!show); setClickedDay(day) }}>
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
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        {events.map((event) => (
                            isSameDay(event.start, clickedDay) && (
                                <div key={event.title} className="event">
                                    {event.title}
                                </div>
                            )
                        ))}
                    </Tooltip>
                )}
            </Overlay>
        </div>
    );
}
