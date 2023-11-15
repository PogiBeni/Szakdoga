import { useContext, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { UserContext } from '../../Context/UserContext';
import { addGroup } from '../../../apiCalls/ApiCalls';
import ErrorMsg from '../../basicComponents/ErrorMsg';
import InputWithLabel from '../../basicComponents/InputWithLabel';


export default function AddGroupPopover() {

    const [user, setUser] = useContext(UserContext)
    const [errorMSG, seterrorMSG] = useState(null)
    const [group, setGroup] = useState(
        {
            groupName: "",
            creatorUserId: user.id,
            creatorName: user.name,
            description: ""
        })

    function handleSubmit(e) {
        e.preventDefault()
        if (!group.groupName) { seterrorMSG("Group name empty!"); return }

        addGroup(group).then((data => {
            seterrorMSG(null)
            const groupWithId = ({ ...group, id: data })
            setUser({ ...user, groups: [...user.groups, groupWithId] })
            setGroup({
                groupName: "",
                creatorUserId: user.id,
                creatorName: user.name,
                description: ""
            })
            document.body.click()
        }))
    }
    const popover = (
        <Popover >
            <Popover.Header as="h1">{`Create a new group:`}</Popover.Header>
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
                        <button type="submit" className="btn alert alert-success me-2 p-2">Add</button>
                    </div>
                </form>
            </Popover.Body>
        </Popover>
    )

    return (

        <OverlayTrigger trigger="click"
            placement="right"
            rootClose="true"
            overlay={popover}
            container={document.getElementById('addGroupModal')}
        >
            <button type='submit' className="btn btn-success ms-2">
                <img src="/icons/plusCircle.svg" className='icon' />
            </button>
        </OverlayTrigger>
    )
}