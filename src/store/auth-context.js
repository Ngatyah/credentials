import React, { useState, useEffect } from 'react';
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('isLoggedIn');

        if (storedUserInfo === '1') {
            setIsLoggedIn(true);
        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    }
    const logInHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }
    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: logInHandler
    }}>{props.children}</AuthContext.Provider>
}

export default AuthContext;