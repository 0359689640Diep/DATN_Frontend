import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isShowModalLogin, setShowModalLogin] = useState(false);

    return (
        <AuthContext.Provider value={{ isShowModalLogin, setShowModalLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
