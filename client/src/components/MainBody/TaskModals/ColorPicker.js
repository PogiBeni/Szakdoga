import "./TaskModal.css"
import colorOptions from '../../constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function ColorPicker({ color, setTaskColor }) {

    const colorPopover = (
        <Popover >
            <Popover.Header className='eventHeader' as="h4">{`Colors:`}</Popover.Header>
            <Popover.Body>
                <div className='colorGrid'>
                    {colorOptions.map((color) => (
                        <div
                            key={color.value} className='colorTemplate form-control'
                            style={{ backgroundColor: color.value }}
                            onClick={() => setTaskColor(color.value)}
                        />
                    ))}
                </div>
            </Popover.Body>
        </Popover>
    )
    
    return (
        < >
            <OverlayTrigger trigger="click" placement="left" rootClose="true" overlay={colorPopover}>
                <div type="text" className="form-control me-2"
                    style={{
                        backgroundColor: color,
                        width: '3.7rem',
                        height: '3.7rem',

                    }} />
            </OverlayTrigger>
        </>
    )
}