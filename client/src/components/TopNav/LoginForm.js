import { useState, useContext } from "react"
import { fetchUserData } from "../../apiCalls/LoginVerification"
import { UserContext } from "../Context/UserContext"

export default function LoginForm() {

    
    const [user,setUser] = useContext(UserContext)
    const [userLogin, setUserLogin] = useState(
        {
            email: "",
            password: ""
        })

    function handleSubmit(e) {
        e.preventDefault();
        fetchUserData(userLogin.email, userLogin.password)
            .then((data) => {
                setUser({
                    name:data.fullName,
                    link:data.linkToPicture,
                    id:data.id,
                    email:data.email,
                    loggedIn:true
                })
            })
            .catch((error) => {
                console.error('Error in MyComponent:', error);
            });
        document.querySelector('.btn-close').click()
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center flex-column mt-3" >
            <p>Or</p>
            <input type="email" value={userLogin.email} onChange={(e) => setUserLogin({...userLogin, email: e.target.value })} className="form-control m-2" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
            <input type="password" value={userLogin.password} onChange={(e) => setUserLogin({...userLogin, password: e.target.value })} className="form-control m-2" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />

            <div className="d-flex align-items-center mt-4 ">
                <button type="button" className="btn btn-light me-4" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-warning ">Sign in</button>
            </div>
        </form>
    )
}