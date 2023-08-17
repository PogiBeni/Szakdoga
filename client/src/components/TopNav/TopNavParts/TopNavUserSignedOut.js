import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';

export default function TopNavUserSignedOut() {

    return (
        <div className="TopNavUserSignedOut">
            <button type="button" className="btn btn-secondary btn-lg me-3 " data-bs-toggle="modal" data-bs-target="#loginModal">
                Login
            </button>
            <LoginModal/>
            <RegisterModal/>
        </div>
    )
}   