import { useState,useEffect } from "react"

export default function LoginForm() {

    const [data, setData] = useState({});
    const [userLogin, setUserLogin] = useState(
        {
            email: "",
            password: ""
        })

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/api", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: "poganybenedek@gmail.com" })
          })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            alert(userLogin.email + data[0].email);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        
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