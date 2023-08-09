import GoogleLoginButton from './LoginButtons/GoogleLoginButton';
import LoginForm from './LoginForm';

export default function TopNavUserSignedOut() {
    
    return (
        <div className="TopNavUserSignedOut">
<<<<<<< HEAD
            <button type="button" className="btn btn-warning btn-lg" data-bs-toggle="modal" data-bs-target="#loginModal">
=======
            <button type="button" className="btn btn-warning btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
>>>>>>> 96752d02d6b2116b3afa484c73f74222a6e3a187
                Sign in
            </button>
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-bg-warning">
                            <h1 className="modal-title fs-5 " id="loginModalLabel">Sign in</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center flex-column">
                            <GoogleLoginButton className="mb-5" />
                            <LoginForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}