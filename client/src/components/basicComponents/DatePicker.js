import { useState } from "react"
import DatePickerPopover from "../MainBody/Popovers/DatePickerPopover"
import { format } from 'date-fns';

export default function Datepicker({date,handleDatePickerSelection}) {
    const [target, setTarget] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false)

    function handleShowStartDatePicker(e) {
        setShowDatePicker(!showDatePicker)
        setTarget(e.target)
    }

    return (
        <>

            <input type="text" className="form-control" value={format(date, "yyyy/MM/dd")}
                readOnly={true}
                placeholder="YYYY/MM/DD"
                onClick={(e) => { handleShowStartDatePicker(e) }} />

            <DatePickerPopover
                show={showDatePicker}
                target={target}
                onHide={() => setShowDatePicker(false)}
                placement={"left"}
                onDateSelect={handleDatePickerSelection} />
        </>
    )
}