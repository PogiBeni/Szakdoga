import { useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import { LabelContext } from '../Context/LabelContext';

export default function LabelSelect({ setLabel }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [labels, setLabels] = useContext(LabelContext)

    if (!labels) { return }

    const options = labels
        .filter((label) => label !== null)
        .map((label) => ({
            value: label,
            label: label,
        }));

    const handleCreateOption = (inputValue) => {
        const newOption = {
            label: inputValue,
            value: inputValue
        };

        setSelectedOption((prevSelected) => {
            if (Array.isArray(prevSelected)) {
                return [...prevSelected, newOption];
            } else {
                return [newOption];
            }
        });
        setLabel(newOption.value)
        setLabels([...labels, newOption.value])
    };


    function setValues(selected) {
        if (selected) {
            setLabel(selected.value)
            setSelectedOption(selected)
        }
        else {

            setLabel(null)
            setSelectedOption(null)
        }
    }
    return (
        <div>
            <CreatableSelect
                isMulti={false}
                value={selectedOption}
                onChange={setValues}
                onCreateOption={handleCreateOption}
                options={options}
                placeholder="Select tag:"
                className='w-100'
                isClearable

            />
        </div>
    );
}