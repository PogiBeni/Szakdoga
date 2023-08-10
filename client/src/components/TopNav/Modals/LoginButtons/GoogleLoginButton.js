import { GoogleLogin } from '@react-oauth/google';
import { useContext } from "react";
import { UserContext } from '../../../Context/UserContext';
import jwt_decode from 'jwt-decode';


export default function GoogleLoginButton() {
    
    const [user,setUser] = useContext(UserContext)

    return (
        <GoogleLogin 
            onSuccess={credentialResponse => {
                var userOb = jwt_decode(credentialResponse.credential);
                console.log(userOb);
                setUser({
                    name:userOb.name,
                    link:userOb.picture,
                    id:userOb.exp,
                    email:userOb.email,
                    loggedIn:true
                })
                console.log(user)
                document.querySelector('.btn-close').click()
            }}
            onError={() => {
                console.log('Login Failed')
            }}
            size="large"
            locale="en"
        />
    )
}