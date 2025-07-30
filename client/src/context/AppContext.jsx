import { createContext, useEffect, useState } from 'react';
import React from 'react';
import App from '../App';
import { toast } from 'react-toastify';
import { data } from 'react-router-dom';
import axios from 'axios';

export const AppContent = createContext()

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLogedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)
    
    const getAuthState= async()=>{
        try{
            const {data}=await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
                setUserData(data.userData)
            }
        }catch{
            toast.error(error.message)
        }

    }

    const getUserData = async () => {
        try {
            const{data} = await axios.get(backendUrl + '/api/user/data')
            
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        getAuthState();
    }, [])

    const value = {

        backendUrl,
        isLogedin,setIsLoggedin,
        userData,setUserData, getUserData

    }

    return(
        <AppContent.Provider value={value}>
        {props.children}
        </AppContent.Provider>
    )
}