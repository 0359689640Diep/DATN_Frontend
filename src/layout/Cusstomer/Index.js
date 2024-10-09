import { useContext } from "react";
import Authentication from "../../pages/Authentication";
import Footer from "./Footer";
import Headers from "./Header";
import Slibar from './Slibar';
import AuthProvider, { AuthContext } from "../../pages/Authentication/AuthContext";
const LayoutContent = () => {
    const { isShowModalLogin, isShowModalRegister, token } = useContext(AuthContext);

    return (
        <>
            <Headers />
            {/* Hiển thị form đăng nhập hoặc đăng ký dựa trên trạng thái */}
            {!token && (
                <>
                    {isShowModalLogin && <Authentication type="login" />}
                    {isShowModalRegister && <Authentication type="register" />}
                </>
            )}
        </>
    );
};

export default function LayoutCustomer({ children }) {
    return (
        <div style={{ paddingLeft: 0, fontFamily: 'signika-negative, sans-serif' }}>
            <AuthProvider>
                <LayoutContent />
            </AuthProvider>
                {children}
            <Footer />
        </div>
    );
}