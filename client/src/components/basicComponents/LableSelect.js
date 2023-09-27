import { useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import { LabelContext } from '../Context/LabelContext';

export default function LabelSelect({ setLabel }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [labels, setLabels] = useContext(LabelContext)
    
    if (!labels) { return }

    const options = labels.map((label) => ({
        value: label,
        label: label
    }))
    const handleCreateOption = (inputValue) => {
        // Create a new option object
        const newOption = {
          label: inputValue,
          value: inputValue.toLowerCase().replace(/\W/g, ''),
        };
      
        // Add the new option to the list of selected options
        setSelectedOption((prevSelected) => {
          if (Array.isArray(prevSelected)) {
            return [...prevSelected, newOption];
          } else {
            // If prevSelected is null or not an array, initialize it as an array with the newOption
            return [newOption];
          }
        });
        setLabel(newOption.value)
        setLabels([...labels, newOption.value])
      };
      

    function setValues(selected){
        setLabel(selected.value)
        console.log(selected)
        setSelectedOption(selected)
    }
    return (
        <div>
            <CreatableSelect
                isMulti={false}
                value={selectedOption}
                onChange={setValues}
                onCreateOption={handleCreateOption}
                options={options} // Pass the selected options as options
                placeholder="Select tag:"
                className='w-100'
                menuPortalTarget={document.getElementById('addTaskModal')}
                
            />
        </div>
    );
}