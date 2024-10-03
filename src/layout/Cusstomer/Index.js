import { useContext } from "react";
import Authentication from "../../pages/Authentication";
import Footer from "./Footer";
import Headers from "./Header";
import Slibar from './Slibar';
import AuthProvider, { AuthContext } from "../../pages/Authentication/AuthContext";
const LayoutContent = () => {
    const { isShowModalLogin, token } = useContext(AuthContext);

    return (
        <>
            <Headers />
            {isShowModalLogin && !token && <Authentication />}
        </>
    );
};
export default function LayoutCustomer({ children }) {
    return (
        <div style={{ paddingLeft: 0, fontFamily: 'signika-negative, sans-serif' }}>
            <AuthProvider>
                <LayoutContent />
            </AuthProvider>
            <Slibar />
            <div style={{ padding: "1% 17%" }}>
                {children}
            </div>
            <Footer />
        </div>
    );
}