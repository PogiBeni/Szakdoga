import BasicModal from "../../basicComponents/BasicModal";
import AddGroupForm from "./AddGroupForm";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import Select from "react-select";
import ShowPeoplePopover from "../Popovers/ShowPeoplePopover";
import AddPeoplePopover from "../Popovers/AddPeoplePopover";
import { getUsersOfGroup } from "../../../apiCalls/ApiCalls";

export default function GroupModal() {
    const [user, setUser] = useContext(UserContext)
    const [selectedOptions, setSelectedOptions] = useState()
    const [selectedGroup, setSelectedGroup] = useState()
    const [showPeoplePopover, setShowPeoplePopover] = useState(false)
    const [showAddPeoplePopover, setShowAddPeoplePopover] = useState(false)
    const [target, setTarget] = useState()

    const options = user.groups.map((group) => ({
        value: group.id,
        label: group.groupName
    }))
    const handleSelectChange = (selectedValue) => {
        console.log('Selected Value:', selectedValue)
        setSelectedOptions(selectedValue)
        setSelectedGroup(user.groups.find((group) => group.id === selectedValue.value))
        console.log(user.groups.find((group) => group.id === selectedValue.value));
        try {
            getUsersOfGroup(selectedValue).then((data) => {
                console.log(data); // This will print the array of users.
                setSelectedGroup((prevGroup) => ({ ...prevGroup, users: data }));
                console.log(selectedGroup)
            })
        } catch (error) {
            console.error('Error loading users:', error);
        }
        
    };

    function handleShowPeoplePopover(e) {
        setShowPeoplePopover(!showPeoplePopover)
        setTarget(e.target)
    }
    function handleShowAddPeoplePopover(e) {
        setShowAddPeoplePopover(!showAddPeoplePopover)
        setTarget(e.target)
    }

    return (
        <BasicModal name={"addGroupModal"} title={"Groups:"} size={"modal-lg"} >
            <div className="d-flex justify-content-between m-3">
                <div className="w-50">
                    <Select
                        isMulti={false}
                        name="groups"
                        options={options}
                        className="basic-multi-select "
                        classNamePrefix="Groups"
                        onChange={handleSelectChange}
                        value={selectedOptions}
                    />
                    {selectedGroup && selectedOptions ?

                        <div className="mt-3 ms-1">
                            <h4 className="mb-4">{selectedGroup.groupName} </h4>
                            <div>
                                <span className="fw-bold">Created by: </span> {selectedGroup.creatorName} <br />
                                <span className="fw-bold">Description:</span>
                                <p className="lh-1">{selectedGroup.description}</p>

                                <div className="mt-4"  >
                                    <img className="icon" src="/icons/people.svg" onClick={(e) => { handleShowPeoplePopover(e) }} />
                                    {user.id = selectedGroup.creatorUserId ?

                                        <img className="icon ms-3" src="/icons/addPerson.svg" onClick={(e) => { handleShowAddPeoplePopover(e) }} />

                                        : null}
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <div className="ms-4">
                    <AddGroupForm />
                    <ShowPeoplePopover show={showPeoplePopover} target={target} onHide={() => setShowPeoplePopover(false)} group={selectedGroup} />
                    <AddPeoplePopover show={showAddPeoplePopover} target={target} onHide={() => setShowAddPeoplePopover(false)} group={selectedGroup} />
                </div>

            </div>

        </BasicModal >
    )
}