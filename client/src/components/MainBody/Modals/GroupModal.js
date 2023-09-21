import BasicModal from "../../basicComponents/BasicModal";
import AddGroupForm from "./AddGroupForm";
import { useContext, useState, forwardRef } from "react";
import { UserContext } from "../../Context/UserContext";
import Select from "react-select";
import ShowPeoplePopover from "../Popovers/ShowPeoplePopover";
import AddPeoplePopover from "./AddPeoplePopover";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

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
    };

    function handleShowPeoplePopover(e) {
        setShowPeoplePopover(!showPeoplePopover)
        setTarget(e.target)
    }
    const renderTooltip = (props) => (
        <div>
            Alma
        </div>
      );


    return (
        <BasicModal name={"addGroupModal"} title={"Groups:"} size={"modal-lg"} >
            <div className="d-flex justify-content-between m-3">
                <div style={{ width: "15vw" }}>
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
                                    
                                        <img className="icon ms-3" src="/icons/addPerson.svg"  />
                                            
                                     
                                   : null}
                                    
                                     </div>
                            </div>
                        </div>
                        : null}
                </div>
                <div className="ms-4">
                    <AddGroupForm />
                    <ShowPeoplePopover show={showPeoplePopover} target={target} onHide={() => setShowPeoplePopover(false)} />
                               
                </div>

            </div>

        </BasicModal >
    )
}