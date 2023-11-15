import BasicModal from "../../basicComponents/BasicModal";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import Select from "react-select";
import ShowPeoplePopover from "./ShowPeoplePopover";
import AddPeoplePopover from "./AddPeoplePopover";
import { getUsersOfGroup } from "../../../apiCalls/ApiCalls";
import AddGroupPopover from "./AddGroupPopover";
import DeleteGroupModal from "./DeleteGroupModal";
import EditGroupPopover from "./EditGroupPopover";

export default function GroupModal() {
    const [user, setUser] = useContext(UserContext)
    const [selectedOptions, setSelectedOptions] = useState()
    const [selectedGroup, setSelectedGroup] = useState()
    const [options, setOptions] = useState()

    useEffect(() => {
        if (user.loggedIn && user.groups) {
            const loadOptions = user.groups.map((group) => ({
                value: group.id,
                label: group.groupName
            }));
            setOptions(loadOptions);
        } else {
            setOptions(null);
            setSelectedGroup(null)
            setSelectedOptions(null)
        }
    }, [user.groups]);

    const handleSelectChange = (selectedValue) => {
        refreshUsers(selectedValue)
    }

    function refreshUsers(option) {
        setSelectedOptions(option)
        setSelectedGroup(user.groups.find((group) => group.id === option.value))
        try {
            getUsersOfGroup(option).then((data) => {
                setSelectedGroup((prevGroup) => ({ ...prevGroup, users: data }));
            })
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    const deleteButton = selectedGroup && user.id === selectedGroup.creatorUserId ? (
        <img src="/icons/delete.svg"
            className="btn btn-danger ms-3"
            data-bs-toggle="modal"
            data-bs-target="#DeleteGroupModal"/>
    ) : null;

    const editGroupButton = selectedGroup && user.id === selectedGroup.creatorUserId ? (
        <EditGroupPopover selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} setSelectedOptions={setSelectedOptions} />
    ) : null;

    const addPersonButton = selectedGroup && user.id === selectedGroup.creatorUserId ? (
        <AddPeoplePopover group={selectedGroup} refresh={refreshUsers} />
    ) : null;

    const showPeopleButton = selectedGroup ? (
        <ShowPeoplePopover group={selectedGroup} refresh={refreshUsers} />
    ) : null;

    return (
        <>
            <BasicModal name={"addGroupModal"} title={"Groups:"}  >
                <div >
                    <div className="d-flex justify-content mt-3">
                        <Select
                            isMulti={false}
                            name="groups"
                            options={options}
                            className="basic-multi-select w-100"
                            classNamePrefix="Groups"
                            onChange={handleSelectChange}
                            value={selectedOptions}
                        />
                        <AddGroupPopover />
                    </div>
                    <div className="mt-4 ms-2"  >
                        {showPeopleButton}
                        {addPersonButton}
                        {editGroupButton}
                        {deleteButton}
                    </div>
                    {selectedGroup && selectedOptions ?
                        <div className="mt-3 ms-1">
                            <h4 className="mb-4">{selectedGroup.groupName} </h4>
                            <div>
                                <span className="fw-bold">Created by: </span>
                                <p className="mb-1">{selectedGroup.creatorName} </p>
                                <span className="fw-bold">Description:</span>
                                <p className="lh-1">{selectedGroup.description}</p>
                            </div>
                        </div>
                        : null}
                </div>
            </BasicModal >
            <DeleteGroupModal selectedGroup={selectedGroup} onGroupRemoved={() => { setSelectedGroup(null); setSelectedOptions(null) }} />
        </>
    )
}