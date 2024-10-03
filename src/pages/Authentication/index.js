// Authentication.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from "./Login";

const Authentication = () => {
    const { setShowModalLogin, setToken } = useContext(AuthContext);

    const handleClose = () => {
        setShowModalLogin(false);
    };

    const handleLoginSuccess = (token) => {
        setToken(token); // Thiết lập token khi đăng nhập thành công
        setShowModalLogin(false); // Đóng modal sau khi đăng nhập
    };

    return (
        <Login
            show={true}
            handleClose={handleClose}
            handleLoginSuccess={handleLoginSuccess} // Truyền hàm để xử lý đăng nhập thành công
        />
    );
};

export default Authentication;
