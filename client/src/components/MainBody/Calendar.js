import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const events = [
        { title: 'Event 1',color:'red', start: new Date(), end: new Date() },
        // ... other events
    ];

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
                        <div >
                            {events.map((event) => (
                                isSameDay(event.start, day) && (
                                    <div key={event.title} className={`event bg-${event.color}`}>
                                        {event.title}
                                    </div>
                                )))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
