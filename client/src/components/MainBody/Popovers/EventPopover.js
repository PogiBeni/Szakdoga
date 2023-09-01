import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { isSameDay } from 'date-fns';
import { useState, useRef } from 'react';
export default function EventPopover({ events, day }) {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    var placementVar
    if (day) {
        if (day.getDate() > 28) {
            placementVar = "top"
        }
        else placementVar = "bottom"
    }
    return (
        <>
            <div className="event" ref={target} onClick={() => setShow(!show)}>
                {events.filter((event) => isSameDay(event.start, day)).length} events
            </div>
            <Overlay
                show={show}
                target={target.current}
                placement={placementVar}
                containerPadding={20}
                rootClose="true"
                onHide={() => setShow(!show)}
                transition={false}
            >
                <Popover >
                    <Popover.Header className='eventHeader' as="h3">{`Events:`}</Popover.Header>
                    <Popover.Body>
                        {events.map((event) => (
                            isSameDay(event.start, day) && (
                                <div key={event.title} className="event">
                                    {event.title}
                                </div>
                            )
                        ))}
                    </Popover.Body>
                </Popover>

            </Overlay>

        </>
    )
}