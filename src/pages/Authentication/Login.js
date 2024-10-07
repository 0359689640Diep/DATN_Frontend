import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import className from '../../components/ClassName';
import style from "./style.scss";
import { ValidateLogin } from '../../validation/Authentication';
import { useNavigate } from 'react-router-dom';
import { LoginRequset } from '../../services/Authentication';
import { Notification } from '../../components/Response';
import ForgotPassword from './ForgotPassword';


const Login = (props) => {

    const cx = className(style);
    const navigate = useNavigate();

    const [isShowModalForgotPassword, setShowModalForgotPassword] = useState(false);

    const { show, handleClose, onDataUpdated } = props;
    const handleForgotPasswordClick = () => {
        // Mở modal Forgot Password khi click
        setShowModalForgotPassword(true);
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    // lắng nghe sự kiện change của 1 thẻ
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật dữ liệu form
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Xác thực toàn bộ form nhưng chỉ cập nhật lỗi cho trường hiện tại
        const { error } = ValidateLogin.validate({ ...formData, [name]: value }, { abortEarly: false });


        if (!error) {
            // Nếu không có lỗi cho trường hiện tại, xóa thông báo lỗi của trường đó
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        } else {
            // Tìm lỗi cho trường hiện tại (nếu có)
            const fieldError = error.details.find((err) => err.path[0] === name);

            if (fieldError) {
                // Nếu có lỗi cho trường hiện tại, cập nhật thông báo lỗi cho trường đó
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: fieldError.message,
                }));
            } else {
                // Nếu không có lỗi cho trường hiện tại, xóa thông báo lỗi của trường đó
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        }
    };

    // lắng nghe sự kiện submit và gửi form
    const handleSubmitAdd = async (e) => {
        e.preventDefault();

        const { error } = ValidateLogin.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors); // Cập nhật tất cả lỗi
        } else {
            setErrors({}); // Xóa hết lỗi nếu tất cả đều hợp lệ
            const response = await LoginRequset(formData);
            switch (response.status) {
                case 200:
                    Notification("success", response.data.message);
                    handleClose();
                    setFormData({
                        email: '',
                        password: '',
                    });
                    let redirect = "";
                    switch (response.data.role) {
                        case 1:
                            redirect = "/admin";
                            break;
                        case 2:
                            // lễ tân
                            redirect = "/receptionist";
                            break;
                        case 3:
                            // quản lý
                            redirect = "/manage";
                            break;
                        case 4:
                            // khách hàng
                            redirect = "/";
                            break;
                        default:
                            break;
                    }
                    navigate(redirect);
                    localStorage.setItem("accessToken", response.data.access_token);
                    // onDataUpdated();
                    break;
                case 422:
                    // Lấy lỗi từ response và hiển thị cho các trường tương ứng
                    const errors = response.data;  // Giả sử lỗi được trả về trong response.data

                    // Tạo object chứa tất cả lỗi của các trường
                    const formattedErrors = {};
                    Object.keys(errors).forEach((field) => {
                        // Lấy lỗi đầu tiên cho mỗi field và gán vào formattedErrors
                        formattedErrors[field] = errors[field][0];
                    });

                    // Cập nhật state errors với các lỗi mới từ backend
                    setErrors(formattedErrors);
                    break;
                case 400:
                    Notification("error", response.data.message);
                    break;
                default:
                    Notification("error", "Hệ thống đang bảo trì");
                    break;
            }

        }
    };

    const handleCloseForgotPassword = () => {
        setShowModalForgotPassword(false);
    }

    return (
        <>
            <Modal fullscreen="xxl-down" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="justify-content-center">
                    <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center">
                        Đăng nhập tài khoản
                    </Modal.Title>
                </Modal.Header>
                <form className="modal-content bg-light-subtle" onSubmit={handleSubmitAdd}>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <input value={formData.email} type="email" className="form-control" placeholder='Nhập email' name='email' id="email" onChange={handleChange} />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <input value={formData.password} type="password" className="form-control" placeholder='Nhập mật khẩu' name='password' id="password" onChange={handleChange} />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <i onClick={handleForgotPasswordClick} className={`${cx("forgot-password-verification")}`}>Bạn không nhớ mật khẩu của mình ? </i>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <button type="submit" className={`${cx("button")} btn`}>Đăng nhập ngay</button>
                    </Modal.Footer>
                </form>
            </Modal>
            {isShowModalForgotPassword && (
                <ForgotPassword
                    show={isShowModalForgotPassword}
                    handleCloseModalForgotPassword={handleCloseForgotPassword}
                />
            )}
        </>
    )
}

export default Login;