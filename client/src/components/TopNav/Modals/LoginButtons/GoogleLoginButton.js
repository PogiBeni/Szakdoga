import { GoogleLogin } from '@react-oauth/google';
import { useContext } from "react";
import { UserContext } from '../../../Context/UserContext';
import jwt_decode from 'jwt-decode';
import { getTasks, isUserRegistered, pushUserData } from '../../../../apiCalls/ApiCalls';


export default function GoogleLoginButton() {

    const [user, setUser] = useContext(UserContext)

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                var userOb = jwt_decode(credentialResponse.credential);
                isUserRegistered(userOb.email).then((res => {
                    if (res.exists) {
                        async function fetchTasks() {
                            try {
                                const fetchedTasks = await getTasks(res.id);
                                setUser({ 
                                    name: userOb.name,
                                    link: userOb.picture,
                                    id: res.id,
                                    email: userOb.email,
                                    loggedIn: true,
                                    tasks: fetchedTasks});
                            } catch (error) {
                                console.error('Error fetching tasks:', error);
                            }
                        }

                        fetchTasks();
                    }
                    else {
                        pushUserData(userOb.email, null, userOb.name, userOb.picture)
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