export default function TimeInput({placeholder,value,setVariable})
{
    return(
        <input type="text" className="form-control " placeholder={placeholder}
        value={value} onChange={(e) => setVariable(e.target.value )}
        onBlur={() => {
            if (value.length === 2 || value.length === 1) {
                setVariable(value+":00")
            }
        }}
    />
    )
}