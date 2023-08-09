import { useState } from "react"

export default function LoginForm() {


    const [userLogin, setUserLogin] = useState(
        {
            email: "",
            password: ""
        })

    const handleSubmit = (e) => {
        e.preventDefault()
            alert(userLogin.email)
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center flex-column mt-3" >
            <p>Or</p>
            <input type="email" value={userLogin.email} onChange={(e) => setUserLogin({ email: e.target.value })} className="form-control m-2" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
            <input type="password" className="form-control m-2" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />

            <div className="d-flex align-items-center mt-4 ">
                <button type="button" className="btn btn-light me-4" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-warning ">Sign in</button>
            </div>
        </form>
    )
}