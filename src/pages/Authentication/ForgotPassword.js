import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import style from "./style.scss";
import className from '../../components/ClassName';
import { ValidateforgotPassword } from '../../validation/Authentication';
import { ForgotPasswordRequset } from '../../services/Authentication';
import { Notification } from '../../components/Response';
import ForgotPasswordVerification from './ForgotPasswordVerification';

const ForgotPassword = ({ show, handleCloseModalForgotPassword }) => {
    const cx = className(style);
    const [errors, setErrors] = useState({});
    const [isShowModalForgotPasswordVerification, setShowModalForgotPasswordVerification] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const { error } = ValidateforgotPassword.validate({ ...formData, [name]: value }, { abortEarly: false });

        if (!error) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        } else {
            const fieldError = error.details.find((err) => err.path[0] === name);
            if (fieldError) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: fieldError.message,
                }));
            } else {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Gửi mã xác nhận và xử lý logic tiếp theo
        const { error } = ValidateforgotPassword.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors);
        } else {
            setErrors({});
            // handleCloseModalForgotPassword(false);

            const response = await ForgotPasswordRequset(formData);
            switch (response.status) {
                case 201:
                    Notification("success", response.data.message);
                    // Sau khi xác nhận thành công có thể đóng modal hoặc xử lý thêm
                    setFormData({email: ''});
                    setShowModalForgotPasswordVerification(true);
                    break;
                case 422:
                    Notification("warning", response.data.message);
                    break;
                case 404:
                    Notification("warning", response.data.message);
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


    return (
        <>
            <Modal show={show} onHide={handleCloseModalForgotPassword} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center">
                        Xác nhận tài khoản
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit} className="py-4 ">
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="confirmationEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                name='email'
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email tài khoản của bạn"
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <button type="submit" className={`${cx("button")} btn`}>Tiếp theo</button>
                    </Modal.Footer>
                </form>
            </Modal>
            <ForgotPasswordVerification
                show={isShowModalForgotPasswordVerification}
                handleClose={() => setShowModalForgotPasswordVerification(false)}
            />
        </>
    );
};

export default ForgotPassword;
