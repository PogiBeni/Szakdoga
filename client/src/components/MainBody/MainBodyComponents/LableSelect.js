import { useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import { LabelContext } from '../../Context/LabelContext';

export default function LabelSelect({ setLabel, selectedOption, setSelectedOption }) {
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

    const CustomArrow = () => {
        return (
            <div className="m-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-tags-fill" viewBox="0 0 16 16">
                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                </svg>
            </div>
        );
    }

    return (
        <div>
            <CreatableSelect
                isMulti={false}
                value={selectedOption}
                onChange={setValues}
                onCreateOption={handleCreateOption}
                options={options}
                placeholder="Select label:"
                className='w-100'
                isClearable
                components={{ DropdownIndicator: CustomArrow }}
            />
        </div>
    );
}