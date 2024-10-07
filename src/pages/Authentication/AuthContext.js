import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isShowModalLogin, setShowModalLogin] = useState(false);
    const [isShowModalRegister, setShowModalRegister] = useState(false);


    return (
        <AuthContext.Provider value={{ isShowModalLogin, setShowModalLogin, isShowModalRegister, setShowModalRegister }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
