import { useState } from "react"
import ColorPickerPopover from "./Popovers/ColorPickerPopover"

export default function ColorPicker({color,setTaskColor}) {
    
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [target, setTarget] = useState()

    function handleShowColorPicker(e) {
        setShowColorPicker(!showColorPicker)
        setTarget(e.target )
    }
    return (
        < >
            <div>
                <div type="text" className="form-control me-2"
                    onClick={(e) => { handleShowColorPicker(e) }}
                    style={{
                        backgroundColor: color,
                        width: '3.7rem',
                        height: '3.7rem',

                    }} />
            </div>
            <ColorPickerPopover show={showColorPicker} target={target} onHide={() => setShowColorPicker(false)} setColor={setTaskColor} />

        </>
    )
}