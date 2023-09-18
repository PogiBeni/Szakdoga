import AddGroupForm from "./AddGroupForm";

export default function AddGroupModal()
{
    return(
        <div className="modal" id="addGroupModal" tabIndex="-1" aria-labelledby="addGroupModal" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header  bg-dark text-white" data-bs-theme="dark">
                        <h1 className="modal-title fs-5 " id="addGroupModal">Login</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center flex-column">
                    <AddGroupForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}