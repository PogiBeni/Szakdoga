import React, { useState,useContext,useEffect } from 'react';
import Select from 'react-select';
import { UserContext } from '../Context/UserContext';
import { LabelContext } from '../Context/LabelContext';

export default function GroupedSelect({filteredTasks, setFilteredTasks}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [user, setUser] = useContext(UserContext)
    const [labels,setLabels] = useContext(LabelContext)

    
    const selectedValues = selectedOptions.map((option) => option.value);

    useEffect(() => {

        const updatedFilteredTasks = user.tasks.filter((task) =>
            selectedValues.includes(task.groupId) || selectedOptions.includes(task.label)
        );
        setFilteredTasks(updatedFilteredTasks);
    }, [user.tasks, selectedOptions]);

    const groupedOptions = [
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

