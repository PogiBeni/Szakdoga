import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';

export default function TopNavUserSignedOut() {

    return (
        <div className="TopNavUserSignedOut">
            <button type="button" className="btn btn-warning btn-lg" data-bs-toggle="modal" data-bs-target="#loginModal">
                Login
            </button>
            <LoginModal/>
            <RegisterModal/>
        </div>
    )
}