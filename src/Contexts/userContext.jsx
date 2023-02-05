import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/config";
import { Navigate } from "react-router-dom";

export const userContext = createContext()

export const useUserContext = () => {
    return useContext(userContext)
}

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState({
        email: null,
        logged: false,
        error: null
    })

    const googleLogin = () => {
        signInWithPopup(auth, provider)
            .catch((error) => {
                setUser({
                    email: null,
                    logged: false,
                    error: error.message
                })
            })
    }

    

    const login = (values) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, values.email, values.password)
            .catch((error) => {
                setUser({
                    email: null,
                    logged: false,
                    error: error.message
                })
            })
            .finally(() => { setLoading(false) })
        console.log(user);
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({
                    email: null,
                    logged: false,
                    error: null
                })
            })
            .catch((e) => { console.log(e) })
    }

    const register = (values) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .catch((error) => {
                setUser({
                    email: null,
                    logged: false,
                    error: error.message
                })
            })
            .finally(() => { setLoading(false) })
    }


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    logged: true,
                    error: null
                })
            } else {
                logout()
            }
        })
    }, [])

    return (
        <userContext.Provider value={{ user, login, logout, loading, register, googleLogin,  }}>
            {children}
        </userContext.Provider>
    )
}