import { useState, useContext } from "react"
import { getTasks, login } from "../../../apiCalls/ApiCalls"
import { UserContext } from "../../Context/UserContext"
import ErrorMsg from "../../basicComponents/ErrorMsg"
import InputWithLabel from "../../basicComponents/InputWithLabel"

export default function LoginForm() {


    const [user, setUser] = useContext(UserContext)
    const [errorMSG, seterrorMSG] = useState(null)
    const [userLogin, setUserLogin] = useState(
        {
            email: "",
            password: ""
        })

    function handleSubmit(e) {
        e.preventDefault()

        if (!userLogin.email && !userLogin.password) { seterrorMSG("Email or password empty!"); return }

        login(userLogin.email, userLogin.password)
            .then((data) => {
                setUser({
                    name: data.fullName,
                    link: data.link,
                    id: data.id,
                    email: data.email,
                    loggedIn: true,
                    tasks: data.tasks,
                    groups: data.groups
                });
                console.log(data)
                seterrorMSG(null);
                document.querySelector('.btn-close').click()
            })
            .catch((error) => {
                if (error.message === 'Invalid credentials') {
                    seterrorMSG("Invalid email or password");
                    return
                } else {
                    seterrorMSG('Error:' + error);
                    return
                }
            });
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center flex-column mt-3" >
            <p>Or</p>
            <ErrorMsg errorMSG={errorMSG} />
            <InputWithLabel label={"Email:"} addClassName={"w-100"}>
                <input type="email"
                    value={userLogin.email}
                    onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                    className="form-control" placeholder="Email" aria-label="Email" />
            </InputWithLabel>
            <InputWithLabel label={"Password:"} addClassName={"w-100 mt-2"}>
                <input type="password"
                    value={userLogin.password}
                    onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                    className="form-control" placeholder="Password" aria-label="Password" />
            </InputWithLabel>

            <div className="d-flex align-items-center mt-5 ">
                <button type="button" className="btn alert alert-light me-2 p-2" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn alert alert-light me-5 p-2" data-bs-target="#registerModal" data-bs-toggle="modal">Register</button>
                <button type="submit" className="btn alert alert-success me-2 p-2">Login</button>
            </div>
        </form>
    )
}