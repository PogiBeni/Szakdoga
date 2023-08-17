import GoogleLoginButton from './LoginButtons/GoogleLoginButton';
import LoginForm from './LoginForm';

export default function LoginModal() {
    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  bg-dark text-white" data-bs-theme="dark">
                        <h1 className="modal-title fs-5 " id="loginModalLabel">Login</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center flex-column">
                        <GoogleLoginButton className="mb-5" />
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}