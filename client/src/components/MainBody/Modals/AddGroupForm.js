import { useState, useContext,useEffect } from "react"
import { UserContext } from "../../Context/UserContext"
import ErrorMsg from "../../basicComponents/ErrorMsg";
import ColorPicker from "../../basicComponents/ColorPicker";
import InputWithLabel from "../../basicComponents/InputWithLabel";
import { addGroup } from "../../../apiCalls/ApiCalls";

export default function AddGroupForm() {

    const [user, setUser] = useContext(UserContext)
    const [errorMSG, seterrorMSG] = useState(null)
    const [group, setGroup] = useState(
        {
            groupName: "",
            creatorUserId: "",
            groupColor: "#4169E1",
        })

    useEffect(() => {
        setGroup({ ...group, creatorUserId: user.id })
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
            groupColor: "#4169E1",
        })

    }
    function handleColorPickerPickerSelection(selectedColor) {
        setGroup({ ...group, groupColor: selectedColor })
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex  flex-column mt-3" >
            <ErrorMsg errorMSG={errorMSG} />

            <div className="d-flex ">
                <ColorPicker color={group.groupColor} setTaskColor={handleColorPickerPickerSelection} className="d-flex" />
                <InputWithLabel label={"Group name:"} addClassName={"mb-1 w-100"}>
                    <input type="text"
                        className="form-control "
                        value={group.groupName}
                        onChange={(e) => setGroup({ ...group, groupName: e.target.value })}
                        placeholder="Group name:" aria-label="Group name:" />
                </InputWithLabel>
            </div>
            <div className="d-flex align-items-center mt-5 ">
                <button type="button" className="btn alert alert-light me-2 p-2" id="dissmissGroupModal" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn alert alert-success me-2 p-2">Add</button>
            </div>
        </form>
    )
}