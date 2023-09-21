import { useState, useContext,useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import ErrorMsg from "../../basicComponents/ErrorMsg";
import InputWithLabel from "../../basicComponents/InputWithLabel";
import { addGroup } from "../../../apiCalls/ApiCalls";

export default function AddGroupForm() {

    const [user, setUser] = useContext(UserContext)
    const [errorMSG, seterrorMSG] = useState(null)
    const [group, setGroup] = useState(
        {
            groupName: "",
            creatorUserId: "",
            creatorName: "",
            description:""
        })

    useEffect(() => {
        setGroup({ ...group, creatorUserId: user.id,creatorName:user.name })
    }, [user])

    function handleSubmit(e) {
        e.preventDefault()

        if (!group.groupName) { seterrorMSG("Group name empty!"); return }
        console.log(group)
        addGroup(group)
        seterrorMSG(null)
        document.querySelector('#dissmissGroupModal').click()
        setUser({ ...user, groups: [...user.groups, group] })
        setGroup({
            groupName: "",
            creatorUserId: user.id,
            creatorName:user.name,
            description:""
        })

    }

    return (
        <form onSubmit={handleSubmit} className="d-flex  flex-column" >
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
            <div className="d-flex align-items-center mt-5 ">
                <button type="button" className="btn alert alert-light me-2 p-2" id="dissmissGroupModal" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn alert alert-success me-2 p-2">Add</button>
            </div>
        </form>
    )
}