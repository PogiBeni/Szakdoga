import React, { useContext,useEffect,useState } from 'react';
import Select from 'react-select';
import { UserContext } from '../../Context/UserContext';
import { LabelContext } from '../../Context/LabelContext';

export default function FilterSelect({selectedOptions, setSelectedOptions, setFilteredTasks}) {
    const [user, setUser] = useContext(UserContext)
    const [labels,setLabels] = useContext(LabelContext)
    const [groupedOptions, setGroupedOptions] = useState([]);

    
    const selectedValues = selectedOptions.map((option) => option.value);

    useEffect(() => {

      const updatedFilteredTasks = user.tasks.filter((task) => {
        // Check if both options are selected
        if (selectedValues.length  >= 2) {
          return (
            selectedValues.includes(task.groupId) && selectedValues.includes(task.label)
          );
        }
        
        // Check if only the group option is selected
        if (selectedValues.includes(task.groupId)) {
          return true;
        }
      
        // Check if only the label option is selected
        if (selectedValues.includes(task.label)) {
          return true;
        }
      
        // If none are selected, return false
        return false;
      });
      
        setFilteredTasks(updatedFilteredTasks);
    }, [user.tasks, selectedOptions]);

    useEffect(() => {
      const newGroupedOptions = [
        {
          label: 'Groups',
          options: user.groups.map((group) => ({
            value: group.id,
            label: group.groupName,
          })),
        },
        {
          label: 'Labels',
          options: labels
            ? labels
                .filter((label) => label !== null)
                .map((label) => ({
                  value: label,
                  label: label,
                }))
            : [],
        },
      ];
  
      setGroupedOptions(newGroupedOptions);
    }, [user.groups, labels]);
  
    

    const handleChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
    };

    return (
        <div>
            <Select
                isMulti
                name="groups"
                options={groupedOptions}
                placeholder="Filter tasks:"
                className="basic-multi-select "
                classNamePrefix="Groups"
                onChange={handleChange}
                value={selectedOptions}
            />
        </div>
    );
};

