import { GoogleLogin } from '@react-oauth/google';
import { useContext } from "react";
import { UserContext } from '../../Context/UserContext';
import jwt_decode from 'jwt-decode';
import { login, isUserRegistered, pushUserData } from '../../../apiCalls/ApiCalls';


export default function GoogleLoginButton() {

    const [user, setUser] = useContext(UserContext)

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                var userOb = jwt_decode(credentialResponse.credential);
                console.log(userOb)
                isUserRegistered(userOb.email).then((res => {
                    if (res.exists) {
                        login(userOb.email, userOb.sub)
                            .then((data) => {
                                setUser({
                                    name: data.name,
                                    link: data.link,
                                    id: data.id,
                                    email: data.email,
                                    loggedIn: true,
                                    tasks: data.tasks,
                                    groups: data.groups
                                });
                                console.log(data)
                                document.querySelector('.btn-close').click()
                            })
                            .catch((error) => {
                                if (error.message === 'Invalid credentials') {
                                    
                                    return
                                } else {
                                    return
                                }
                            });
                    }
                    else {
                        pushUserData(userOb.email, userOb.sub, userOb.name, userOb.picture)
                            .then((data) => {
                                setUser({
                                    ...user,
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