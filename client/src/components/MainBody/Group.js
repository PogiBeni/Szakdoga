import BasicModal from '../basicComponents/BasicModal';
import AddGroupForm from './Modals/AddGroupForm';

export default function Group() {
    return (
        <div className="d-flex h-100">
            <div className="w-25">
                Groups
                <div className="border border-secondary-subtle rounded h-100 me-2 mt-3">

                </div>
            </div>
            <div className="w-25">
                Tasks
                <div className="border border-secondary-subtle rounded h-100 me-2 mt-3">

                </div>
            </div>
            <div className="flex-grow-1">
                <button className='btn btn-dark btn-sm me-1 ' data-bs-toggle="modal" data-bs-target="#addGroupModal">Create new group</button>
            </div>

            <BasicModal name={"addGroupModal"} title={"Create a group:"} >
                <AddGroupForm />
            </BasicModal>
        </div>
    )
}