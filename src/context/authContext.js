import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) =>{

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const Login = async (inputs) =>{
        const res  = await axios.post('http://localhost:8080/api/auth/login', inputs)
        setCurrentUser(res.data);
    }

    const Logout = async (inputs) =>{
        await axios.post('http://localhost:8080/api/auth/logout')
        setCurrentUser(null);

    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser]);

    return <AuthContext.Provider value={{ currentUser, Login, Logout }}>
                {children}
           </AuthContext.Provider>
}