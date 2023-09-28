import BasicModal from "../../basicComponents/BasicModal";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import Select from "react-select";
import ShowPeoplePopover from "../Popovers/ShowPeoplePopover";
import AddPeoplePopover from "../Popovers/AddPeoplePopover";
import { getUsersOfGroup } from "../../../apiCalls/ApiCalls";
import AddGroupPopover from "../Popovers/AddGroupPopover";

export default function GroupModal() {
    const [user, setUser] = useContext(UserContext)
    const [selectedOptions, setSelectedOptions] = useState()
    const [selectedGroup, setSelectedGroup] = useState()
    const [showPeoplePopover, setShowPeoplePopover] = useState(false)
    const [showAddPeoplePopover, setShowAddPeoplePopover] = useState(false)
    const [showAddGroupPopover, setShowAddGroupPopover] = useState(false)
    const [options, setOptions] = useState()
    const [target, setTarget] = useState()


    useEffect(() => {
        if (user.loggedIn) {
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

    function handleShowPeoplePopover(e) {
        setShowPeoplePopover(!showPeoplePopover)
        setTarget(e.target)
    }
    function handleShowAddPeoplePopover(e) {
        setShowAddPeoplePopover(!showAddPeoplePopover)
        setTarget(e.target)
    }
    function handleShowAddGroupPopover(e) {
        setShowAddGroupPopover(!showAddGroupPopover)
        setTarget(e.target)
    }

    return (
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

                    <button type='submit' className="btn btn-success ms-2" onClick={(e) => { handleShowAddGroupPopover(e) }}>
                        <img src="/icons/plusCircle.svg" className='icon' />
                    </button>
                </div>
                <div className="mt-4 ms-2"  >
                    <img className="icon" src="/icons/people.svg" onClick={(e) => { handleShowPeoplePopover(e) }} />
                    {selectedGroup && user.id == selectedGroup.creatorUserId ?

                        <img className="icon ms-3" src="/icons/addPerson.svg" onClick={(e) => { handleShowAddPeoplePopover(e) }} />

                        : null}
                </div>
                {selectedGroup && selectedOptions ?

                    <div className="mt-3 ms-1">
                        <h4 className="mb-4">{selectedGroup.groupName} </h4>
                        <div>
                            <span className="fw-bold">Created by: </span> {selectedGroup.creatorName} <br />
                            <span className="fw-bold">Description:</span>
                            <p className="lh-1">{selectedGroup.description}</p>


                        </div>
                    </div>
                    : null}
            </div>
            <AddGroupPopover show={showAddGroupPopover} target={target} onHide={() => setShowAddGroupPopover(false)} />
            <ShowPeoplePopover show={showPeoplePopover} target={target} onHide={() => setShowPeoplePopover(false)} group={selectedGroup} refresh={refreshUsers} />
            <AddPeoplePopover show={showAddPeoplePopover} target={target} onHide={() => setShowAddPeoplePopover(false)} group={selectedGroup} refresh={refreshUsers} />

        </BasicModal >
    )
}