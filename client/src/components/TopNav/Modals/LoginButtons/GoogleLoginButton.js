import { GoogleLogin } from '@react-oauth/google';
import { useContext } from "react";
import { UserContext } from '../../../Context/UserContext';
import jwt_decode from 'jwt-decode';
import { isUserRegistered, pushUserData } from '../../../../apiCalls/ApiCalls';


export default function GoogleLoginButton() {

    const [user, setUser] = useContext(UserContext)

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                var userOb = jwt_decode(credentialResponse.credential);
                isUserRegistered(userOb.email).then((res => {
                    if (res === "true") {
                        setUser({
                            name: userOb.name,
                            link: userOb.picture,
                            id: userOb.id,
                            email: userOb.email,
                            loggedIn: true
                        })
                    }
                    else {
                        pushUserData(userOb.email, null, userOb.name, userOb.picture)
                            .then((data) => {
                                setUser({
                                    name: data.fullName,
                                    link: data.linkToPicture,
                                    id: data.id,
                                    email: data.email,
                                    loggedIn: true
                                })

                            })
                    }
                    document.querySelector('.btn-close').click()
                }))
            }}
            onError={() => {
                console.log('Login Failed')
            }}
            size="large"
            locale="en"
        />
    )
}