import RegisterForm from "./RegisterForm"

export default function RegisterModal() {

    return (
        <div className="modal fade" id="registerForm" aria-hidden="true" aria-labelledby="registerFormLabel" tabIndex="-1">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white" data-bs-theme="dark">
                        <h1 className="modal-title fs-5" id="registerFormLabel">Register</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center flex-column">
                        <RegisterForm/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}