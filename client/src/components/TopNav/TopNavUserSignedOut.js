import BasicModal from '../basicComponents/BasicModal';
import GoogleLoginButton from './ModalParts/GoogleLoginButton';
import LoginForm from './ModalParts/LoginForm';
import RegisterForm from './ModalParts/RegisterForm';

export default function TopNavUserSignedOut() {

    return (
        <div className="TopNavUserSignedOut">
            <button type="button" className="btn btn-secondary btn-lg me-3 " data-bs-toggle="modal" data-bs-target="#loginModal">
                Login
            </button>
            <BasicModal name={"loginModal"} title={"Login"}>
                <GoogleLoginButton className="mb-5" />
                <LoginForm />
            </BasicModal>

            <BasicModal name={"registerModal"} title={"Register"}>
                <RegisterForm/>
            </BasicModal>
        </div>
    )
}   