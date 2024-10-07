import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";

const Authentication = () => {
    const { isShowModalLogin, isShowModalRegister, setShowModalLogin, setShowModalRegister,  setToken } = useContext(AuthContext);

    const handleClose = () => {
        setShowModalLogin(false);
        setShowModalRegister(false); 

    };

    const handleLoginSuccess = (token) => {
        setToken(token); // Thiết lập token khi đăng nhập thành công
        setShowModalLogin(false); // Đóng modal sau khi đăng nhập
    };

    const handleRegisterSuccess = (token) => {
        setToken(token); // Thiết lập token khi đăng ký thành công
        setShowModalRegister(false); // Đóng modal sau khi đăng ký thành công
    };
    return (
        <>
            {isShowModalLogin && (
                <Login
                    show={isShowModalLogin}
                    handleClose={handleClose}
                    handleLoginSuccess={handleLoginSuccess} // Xử lý đăng nhập thành công
                />
            )}
            {isShowModalRegister && (
                <Register
                    show={isShowModalRegister}
                    handleClose={handleClose}
                    handleRegisterSuccess={handleRegisterSuccess} // Xử lý đăng ký thành công
                />
            )}
        </>
    );
};

export default Authentication;
