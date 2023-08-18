import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
import config from '../config'

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) =>{
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const Login = async (inputs) =>{
        const {data}  = await axios.post(`${DOMAIN}/api/auth/login`,inputs)
        setCurrentUser(data);
    }

    const Logout = async (inputs) =>{
        await axios.post(`${DOMAIN}/api/auth/logout`)
        setCurrentUser(null);

    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser]);

    return <AuthContext.Provider value={{ currentUser, Login, Logout }}>
                {children}
           </AuthContext.Provider>
}