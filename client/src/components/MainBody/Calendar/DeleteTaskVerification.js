import { useContext, useState } from "react";
import { deleteTask } from "../../../apiCalls/ApiCalls";
import BasicModal from "../../basicComponents/BasicModal";
import { UserContext } from "../../Context/UserContext";


export default function DeleteTaskVerification({task}){
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [user, setUser] = useContext(UserContext)

    function handleDeleteTask() {
        if (deleteConfirmation === "DELETE") {
            deleteTask(task).then(() => {
                const updatedTasks = user.tasks.filter((oldTask) => oldTask.id !== task.id);
                setUser((prevUser) => ({ ...prevUser, tasks: updatedTasks }));
                
                setDeleteConfirmation("")
                document.querySelector('#closeTaskGroupModal').click();
            })
        }
    }
    return(
        <BasicModal name={"DeleteTaskModal"} title={"Confirm task deletion"}>
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
                    id="closeTaskGroupModal"
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteTask}
                >
                    Delete task
                </button>
            </div>
        </BasicModal>
    )
}