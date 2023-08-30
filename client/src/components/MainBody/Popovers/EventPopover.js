import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { isSameDay } from 'date-fns';
export default function EventPopover({ events, clickedDay, show, target, onHide }) {
    
    
    var placementVar
    if(clickedDay)
    {
        if(clickedDay.getDate() > 28){
            placementVar = "top"
        }
        else placementVar = "bottom"
    }
    return (


        <Overlay
            show={show}
            target={target}
            placement={placementVar}
            containerPadding={20}
            rootClose="true"
            onHide={onHide}
        >
            <Popover >
                <Popover.Header className='eventHeader' as="h3">{`Events:`}</Popover.Header>
                <Popover.Body>
                    {events.map((event) => (
                        isSameDay(event.start, clickedDay) && (
                            <div key={event.title} className="event">
                                {event.title}
                            </div>
                        )
                    ))}
                </Popover.Body>
            </Popover>

        </Overlay>
    )
}