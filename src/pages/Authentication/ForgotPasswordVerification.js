import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import className from '../../components/ClassName';
import style from "./style.scss";
import { ValidateforgotPasswordVerification } from '../../validation/Authentication';
import { ForgotPasswordRequsetVerification } from '../../services/Authentication';
import { Notification } from '../../components/Response';

const ForgotPasswordVerification = (props) => {
    const cx = className(style);
    const { show, handleClose } = props;

    const [formData, setFormData] = useState({
        code: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const { error } = ValidateforgotPasswordVerification.validate({ ...formData, [name]: value }, { abortEarly: false });
        
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

        const { error } = ValidateforgotPasswordVerification.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors);
        } else {
            setErrors({});
            const response = await ForgotPasswordRequsetVerification(formData);
            switch (response.status) {
                case 200:
                    Notification("success", response.data.message);
                    handleClose(); 
                    setFormData({
                        code: '',
                        password: '',
                        password_confirmation: '',
                    });
                
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
        <>
            <Modal fullscreen="xxl-down" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="justify-content-center">
                    <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center">
                        Xác thực mã và đổi mật khẩu
                    </Modal.Title>
                </Modal.Header>
                <form className="modal-content bg-light-subtle" onSubmit={handleSubmitAdd}>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <input value={formData.code} type="text" className="form-control" placeholder='Nhập mã đã được gửi về mail của bạn' name='code' id="code" onChange={handleChange} />
                                    {errors.code && <div className="text-danger">{errors.code}</div>}
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
                        <button type="submit" className={`${cx("button")} btn`}>Xác nhận</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default ForgotPasswordVerification;
