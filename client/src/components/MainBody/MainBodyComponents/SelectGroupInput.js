import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import Select from 'react-select';

export default function SelectGroupInput({ setVariable }) {
    const [user, setUser] = useContext(UserContext)
    const [options, setOptions] = useState()
    const [selectedOptions, setSelectedOptions] = useState()

    useEffect(() => {
        const loadOptions = user.groups.map((group) => ({
            value: group.id,
            label: group.groupName
        }))
        setOptions(loadOptions);
    }, [user.groups]);


    const handleSelectChange = (selectedValue) => {
        if (selectedValue) {
            setVariable(selectedValue)
            setSelectedOptions(selectedValue)
        }
        else {
            setSelectedOptions(null)
            setVariable(0)
        }
    }
    const CustomArrow = () => {
        return (
            <div className="m-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                </svg>
            </div>
        );
    };

    return (
            <Select
                isMulti={false}
                name="groups"
                options={options}
                className=" from-controll w-100"
                classNamePrefix="Groups"
                onChange={handleSelectChange}
                value={selectedOptions}
                placeholder={"Select group:"}
                isClearable
                components={{ DropdownIndicator: CustomArrow }}
            />

    )
}