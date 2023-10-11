import { useState, useContext } from "react";
import BasicModal from "../../basicComponents/BasicModal";
import { deleteGroup } from "../../../apiCalls/ApiCalls";
import { UserContext } from "../../Context/UserContext";

export default function DeleteGroupModal({ selectedGroup, onGroupRemoved }) {
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [user, setUser] = useContext(UserContext);

    if (!selectedGroup) return null;

    function handleDeleteGroup() {
        if (deleteConfirmation === "DELETE") {
            deleteGroup(selectedGroup)
                .then(() => {

                    const updatedGroups = user.groups.filter((group) => group.id !== selectedGroup.id);
                    setUser((prevUser) => ({ ...prevUser, groups: updatedGroups }));
                    onGroupRemoved();
                    setDeleteConfirmation("")

                    document.querySelector('#closeDeleteGroupModal').click();
                })
                .catch((error) => {
                    console.error("Error deleting group:", error);
                });
        }
    }

    return (
        <BasicModal name={"DeleteGroupModal"} title={"Confirm group deletion"}>
            <div>
                <p>
                    To confirm deletion, please type <strong>DELETE</strong> in the
                    input field:
                </p>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type DELETE to confirm"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                />
            </div>
            <div className="modal-footer">
                <button
                    id="closeDeleteGroupModal"
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteGroup}
                >
                    Delete Group
                </button>
            </div>
        </BasicModal>
    );
}
