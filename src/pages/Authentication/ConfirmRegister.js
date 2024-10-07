import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import style from "./style.scss";
import className from '../../components/ClassName';
import { ValidateConfirmRegister } from '../../validation/Authentication';
import { ConfirmRegisterRequset } from '../../services/Authentication';
import { Notification } from '../../components/Response';

const ConfirmRegister = ({ show, handleCloseModalRegister }) => {
    const cx = className(style);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        code: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const { error } = ValidateConfirmRegister.validate({ ...formData, [name]: value }, { abortEarly: false });

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
        const { error } = ValidateConfirmRegister.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors);
        } else {
            setErrors({});
            const response = await ConfirmRegisterRequset(formData);
            switch (response.status) {
                case 200:
                    Notification("success", response.data.message);
                    // Sau khi xác nhận thành công có thể đóng modal hoặc xử lý thêm
                    handleCloseModalRegister();
                    break;
                case 422:
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
        <Modal show={show} onHide={handleCloseModalRegister} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center">
                    Xác nhận mật khẩu
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit} className="py-4 ">
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="confirmationCode" className="form-label">Mã xác nhận</label>
                        <input
                            type="text"
                            name='code'
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Nhập mã xác nhận"
                        />
                        {errors.code && <div className="text-danger">{errors.code}</div>}
                        <i className={`${cx("text")} ms-2 fs-7`} >Mã xác nhận đã được gửi về gmail bạn đã đăng ký vui lòng nhập mã xác nhận để sử dụng dịch vụ. Mã xác nhận có hiệu lực trong 1 phút.</i>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <button type="submit" className={`${cx("button")} btn`}>Xác nhận</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default ConfirmRegister;
