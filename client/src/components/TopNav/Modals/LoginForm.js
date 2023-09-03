import { useState, useContext } from "react"
import { getTasks, login } from "../../../apiCalls/ApiCalls"
import { UserContext } from "../../Context/UserContext"

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
                async function fetchTasks() {
                    try {
                        const fetchedTasks = await getTasks();
                        setUser({
                            name: data.fullName,
                            link: data.linkToPicture,
                            id: data.id,
                            email: data.email,
                            loggedIn: true, 
                            tasks: fetchedTasks
                        });
                        console.log(fetchedTasks)
                    } catch (error) {
                        console.error('Error fetching tasks:', error);
                    }
                }

                fetchTasks();
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
            {errorMSG ?
                <div className="alert alert-danger form-control p-2" role="alert">
                    {errorMSG}
                </div>
                : ""}
            <input type="email" value={userLogin.email} onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })} className="form-control m-2" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
            <input type="password" value={userLogin.password} onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} className="form-control m-2" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />

            <div className="d-flex align-items-center mt-5 ">
                <button type="button" className="btn alert alert-light me-2 p-2" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn alert alert-light me-5 p-2" data-bs-target="#registerForm" data-bs-toggle="modal">Register</button>
                <button type="submit" className="btn alert alert-success me-2 p-2">Login</button>
            </div>
        </form>
    )
}