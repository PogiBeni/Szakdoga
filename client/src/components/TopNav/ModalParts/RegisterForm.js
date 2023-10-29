import { useState, useContext } from "react"
import { isUserRegistered, pushUserData } from "../../../apiCalls/ApiCalls"
import { UserContext } from "../../Context/UserContext"
import ErrorMsg from "../../basicComponents/ErrorMsg"
import InputWithLabel from "../../basicComponents/InputWithLabel"
import Cookies from "js-cookie"

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
        if (!userLogin.email || !userLogin.password || !userLogin.rePassword || !userLogin.fullName) { seterrorMSG("Fill out the form!"); return }
        if (userLogin.password !== userLogin.rePassword) { seterrorMSG("The passwords don't match!"); return }
        isUserRegistered(userLogin.email).then((res => {
            if (res.exists) { seterrorMSG("Email already taken!"); return }
            pushUserData(userLogin.email, userLogin.password, userLogin.fullName, "")
                .then((data) => {
                    setUser({
                        ...user,
                        name: data.fullName,
                        link: data.linkToPicture,
                        id: data.id,
                        email: data.email,
                        loggedIn: true
                    })

                    Cookies.set('userData', JSON.stringify({ email: data.email, id: data.id }));
                })
            seterrorMSG(null);
            document.querySelector('#btnCloseRegister').click()
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center flex-column mt-4" >
            <ErrorMsg errorMSG={errorMSG} />

            <InputWithLabel label={"Full name"} addClassName={"w-100"}>
                <input type="text"
                    value={userLogin.fullName}
                    onChange={(e) => setUserLogin({ ...userLogin, fullName: e.target.value })}
                    className="form-control" placeholder="Fullname" aria-label="fullName"
                />
            </InputWithLabel>

            <InputWithLabel label={"Email"} addClassName={"w-100 mt-2"}>
                <input type="email"
                    value={userLogin.email}
                    onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                    className="form-control" placeholder="Email" aria-label="Email"
                />
            </InputWithLabel>

            <InputWithLabel label={"Password"} addClassName={"w-100 mt-2"}>
                <input type="password"
                    value={userLogin.password}
                    onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                    className="form-control" placeholder="Password" aria-label="Password"
                />
            </InputWithLabel>

            <InputWithLabel label={"Re-password"} addClassName={"w-100 mt-2"}>
                <input type="password"
                    value={userLogin.rePassword}
                    onChange={(e) => setUserLogin({ ...userLogin, rePassword: e.target.value })}
                    className="form-control" placeholder="Re password" aria-label="Password"
                />
            </InputWithLabel>

            <div className="d-flex align-items-center mt-5 ">
                <button type="button" className="btn alert alert-light me-2 p-2" id="btnCloseRegister" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn alert alert-light me-5 p-2" data-bs-target="#loginModal" data-bs-toggle="modal">Login</button>
                <button type="submit" className="btn alert alert-success me-2 p-2">Register</button>
            </div>

        </form>
    )
}