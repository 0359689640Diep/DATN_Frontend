import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import className from '../../components/ClassName';
import style from "./style.scss";
import { ValidateRegister } from '../../validation/Authentication';
import { RegisterRequset } from '../../services/Authentication';
import { Notification } from '../../components/Response';
import ConfirmRegister from './ConfirmRegister';

const Register = (props) => {
    const cx = className(style);
    const { show, handleClose, onDataUpdated } = props;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Quản lý modal xác nhận

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const { error } = ValidateRegister.validate({ ...formData, [name]: value }, { abortEarly: false });

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

    const handleSubmitAdd = async (e) => {
        e.preventDefault();

        const { error } = ValidateRegister.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors);
        } else {
            setErrors({});
            const response = await RegisterRequset(formData);
            switch (response.status) {
                case 201:
                    Notification("success", response.data.message);
                    setShowConfirmModal(true); // Chỉ mở modal xác nhận
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

    // Hàm đóng modal chính khi xác nhận xong
    const handleConfirmClose = () => {
        setShowConfirmModal(false); // Đóng modal xác nhận
        handleClose(); // Đóng modal đăng ký chính sau khi xác nhận thành công
    };

    return (
        <>
            <Modal fullscreen="xxl-down" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="justify-content-center">
                    <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center">
                        Đăng ký tài khoản
                    </Modal.Title>
                </Modal.Header>
                <form className="modal-content bg-light-subtle" onSubmit={handleSubmitAdd}>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <input value={formData.name} type="text" className="form-control" placeholder='Nhập name' name='name' id="name" onChange={handleChange} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                            </div>
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
                                    <input value={formData.password_confirmation} type="password" className="form-control" placeholder='Nhập lại mật khẩu' name='password_confirmation' id="password_confirmation" onChange={handleChange} />
                                    {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation}</div>}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <button type="submit" className={`${cx("button")} btn`}>Đăng ký ngay</button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* Modal xác nhận mật khẩu */}
            <ConfirmRegister
                show={showConfirmModal}
                handleCloseModalRegister={handleConfirmClose} // Đóng modal xác nhận và modal chính sau khi xác nhận
            />
        </>
    );
}

export default Register;
