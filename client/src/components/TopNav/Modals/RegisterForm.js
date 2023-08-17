import { useState, useContext } from "react"
import { isUserRegistered, pushUserData } from "../../../apiCalls/ApiCalls"
import { UserContext } from "../../Context/UserContext"

export default function RegisterForm() {


    const [errorMSG, seterrorMSG] = useState(null)
    const [user, setUser] = useContext(UserContext)
    const [userLogin, setUserLogin] = useState(
        {
            fullName: "",
            email: "",
            password: "",
            rePassword: ""
        })

    function handleSubmit(e) {
        e.preventDefault();
        if (userLogin.email && userLogin.password && userLogin.rePassword && userLogin.fullName) {
            if (userLogin.password == userLogin.rePassword) {
                isUserRegistered(userLogin.email).then((res => {
                    if (res === "true") { seterrorMSG("Email already taken!") }
                    else {
                        pushUserData(userLogin.email, userLogin.password, userLogin.fullName, "")
                            .then((data) => {
                                setUser({
                                    name: data.fullName,
                                    link: data.linkToPicture,
                                    id: data.id,
                                    email: data.email,
                                    loggedIn: true
                                })
                            })
                        seterrorMSG(null);
                        document.querySelector('#btnCloseRegister').click()
                    }
                }))

            } else seterrorMSG("The passwords don't match!")
        }
        else seterrorMSG("Fill out the form!")
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center flex-column mt-4" >
            {errorMSG ?
                <div className="alert alert-danger form-control p-2" role="alert">
                    {errorMSG}
                </div>
                : ""}
            <input type="text" value={userLogin.fullName} onChange={(e) => setUserLogin({ ...userLogin, fullName: e.target.value })} className="form-control m-2" placeholder="Fullname" aria-label="fullName" aria-describedby="addon-wrapping" />
            <input type="email" value={userLogin.email} onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })} className="form-control m-2" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
            <input type="password" value={userLogin.password} onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} className="form-control m-2" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />
            <input type="password" value={userLogin.rePassword} onChange={(e) => setUserLogin({ ...userLogin, rePassword: e.target.value })} className="form-control m-2" placeholder="Re password" aria-label="Password" aria-describedby="addon-wrapping" />

            <div className="d-flex align-items-center mt-5 ">
                <button type="button" className="btn alert alert-light me-2 p-2" id="btnCloseRegister" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn alert alert-light me-5 p-2" data-bs-target="#loginModal" data-bs-toggle="modal">Login</button>
                <button type="submit" className="btn alert alert-success me-2 p-2">Register</button>
            </div>

        </form>
    )
}