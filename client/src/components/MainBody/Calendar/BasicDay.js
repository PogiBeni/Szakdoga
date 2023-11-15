import { isSameDay, format } from "date-fns";

export default function BasicDay({ children, day }) {
    return (
        <div key={day} className={`calendarDay ${isSameDay(day, new Date()) ? 'bg-dark text-white' : ''}`}>
            <div >{format(day, 'd')}</div>
            <div>
                {children}
            </div>
        </div>
    )
}