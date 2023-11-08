import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import ErrorMsg from "../../BasicComponents/ErrorMsg";
import InputWithLabel from "../../BasicComponents/InputWithLabel";
import { editGroup } from '../../../apiCalls/ApiCalls';


export default function EditGroupPopover({ show, target, onHide, selectedGroup, setSelectedGroup, setSelectedOptions }) {
    const [user, setUser] = useContext(UserContext)
    const [errorMSG, seterrorMSG] = useState(null)
    const [group, setGroup] = useState({ })

    useEffect(() => {
        if(!selectedGroup) return
        setGroup({
            id: selectedGroup.id,
            groupName: selectedGroup.groupName,
            creatorUserId: selectedGroup.creatorUserId,
            creatorName: selectedGroup.creatorName,
            description: selectedGroup.description
        })
    }, [selectedGroup]);

    const editLocalGroup = (groupId, updatedData) => {
        setUser((prevUser) => {
          const updatedGroups = prevUser.groups.map((group) => {
            if (group.id === groupId) {
              return { ...group, ...updatedData };
            }
            return group;
          });
          return { ...prevUser, groups: updatedGroups };
        });
      };
      

    function handleSubmit(e) {
        e.preventDefault()
        if (!group.groupName) { seterrorMSG("Group name empty!"); return }
        editGroup(group).then((data => {
            seterrorMSG(null)
            editLocalGroup(group.id,group)
            setSelectedGroup(group)
            setSelectedOptions({value:group.id,label:group.groupName})
            onHide()
        }))
    }

    return (

        <Overlay
            show={show}
            target={target}
            placement={"right"}
            containerPadding={20}
            rootClose="true"
            onHide={onHide}
            transition={false}
            container={document.getElementById('addGroupModal')}
        >
            <Popover >
                <Popover.Header as="h1">{`Edit the group:`}</Popover.Header>
                <Popover.Body  >
                    <form onSubmit={handleSubmit} className="d-flex  flex-column ms-2 me-2 mt-2 mb-0" >
                        <ErrorMsg errorMSG={errorMSG} />

                        <InputWithLabel label={"Group name:"} addClassName={"mb-1 w-100"}>
                            <input type="text"
                                className="form-control "
                                value={group.groupName}
                                onChange={(e) => setGroup({ ...group, groupName: e.target.value })}
                                placeholder="Group name:" aria-label="Group name:" />
                        </InputWithLabel>
                        <InputWithLabel label={"Description:"} addClassName={"w-100"}>
                            <textarea className="form-control" value={group.description} onChange={(e) => setGroup({ ...group, description: e.target.value })} placeholder="Description" aria-label="Description" />
                        </InputWithLabel>
                        <div className="d-flex align-items-center mt-3 ">
                            <button type="button" className="btn alert alert-light me-2 p-2" id="dissmissGroupModal" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn alert alert-success me-2 p-2">Edit</button>
                        </div>
                    </form>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}