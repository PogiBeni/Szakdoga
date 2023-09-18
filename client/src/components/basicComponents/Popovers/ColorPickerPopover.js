import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
export default function ColorPickerPopover({ show, target, onHide, setColor }) {

    const colorOptions = [
        { label: 'purple', value: '#9933FF' },
        { label: 'Royal Blue',   value: '#4169E1' },
        { label: 'Blue', value: '#0000FF' },
        
        { label: 'Seafoam Green', value: '#9FE2BF' },
        { label: 'Jade Green', value: '#00A36C' },
        { label: 'Green', value: 'green' },

        
        { label: 'Banana', value: '#ffe135' },
        { label: 'Amber', value: '#FFBF00' },
        { label: 'Bright Red', value: '#EE4B2B' },
    ];

    return (


        <Overlay
            show={show}
            target={target}
            placement={"left"}
            containerPadding={20}
            rootClose="true"
            onHide={onHide}
            transition={false}
        >
            <Popover >
                <Popover.Header className='eventHeader' as="h4">{`Colors:`}</Popover.Header>
                <Popover.Body>
                    <div className='colorGrid'>
                        {colorOptions.map((color) => (

                            <div 
                            key={color.value} className='colorTemplate form-control' 
                            style={{ backgroundColor: color.value }}
                            onClick={() => setColor(color.value)}
                            />

                        ))}

                    </div>
                </Popover.Body>
            </Popover>

        </Overlay>
    )
}