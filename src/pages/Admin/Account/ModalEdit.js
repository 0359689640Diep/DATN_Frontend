import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { Notification } from '../../../components/Response';
import { validateAccountEdit } from '../../../validation/Account';
import { putAccount } from '../../../services/Account';


const ModalEdit = (props) => {
    const { show, handleClose, onDataUpdated, dataEdit } = props;
    const [id, setId] = useState(0);
    const [imageOld, setImageOld] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        status_id: "",
        images: "",
    });

    useEffect(() => {
        if (dataEdit) {
            setFormData({
                name: dataEdit.name || "",
                email: dataEdit.email || "",
                password: dataEdit.password || "",
                role: dataEdit.role || "",
                status_id: dataEdit.status_id || "",
            });
            setImageOld(dataEdit.image || "");
            setId(dataEdit.id);
        }
    }, [dataEdit]);

    const [errors, setErrors] = useState({});

    // Xử lý thay đổi cho trường văn bản
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "images") {
            let file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));
            setImageOld(URL.createObjectURL(file));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        const { error } = validateAccountEdit.validate(formData, { abortEarly: false });

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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Xác thực toàn bộ form trước khi submit
        const { error } = validateAccountEdit.validate(formData, { abortEarly: false });

        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors); // Cập nhật tất cả lỗi
        } else {
            setErrors({}); // Xóa hết lỗi nếu tất cả đều hợp lệ

            // Tạo đối tượng FormData
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('password', formData.password);
            formDataToSubmit.append('role', formData.role);
            formDataToSubmit.append('status_id', formData.status_id);
            formDataToSubmit.append(`images`, formData.images); // Đính kèm file ảnh

            const response = await putAccount(formDataToSubmit, id); // Gửi formData

            switch (response.status) {
                case 200:
                    handleClose();
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        role: "",
                        images: "",
                        status_id: "",
                    });
                    onDataUpdated();
                    Notification("success", response.data.message);
                    break;
                case 422:
                    Object.entries(response.data).forEach(([key, value]) => {

                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            [key]: value,  // Use [key] to dynamically assign the key
                        }));
                    });

                    break;
                default:
                    Notification("warning", response.data.message);
                    break;
            }
        }
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sửa tài khoản
                </Modal.Title>
            </Modal.Header>
            <form className="modal-content bg-light-subtle" onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Tên</label>
                                <input value={formData.name} type="text" className="form-control" name='name' id="name" onChange={handleChange} />
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input value={formData.email} type="email" className="form-control" name='email' id="email" onChange={handleChange} />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Mật khẩu</label>
                                <input value={formData.password} type="password" className="form-control" name='password' id="password" onChange={handleChange} />
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Chọn quyền</label>
                                <select
                                    className="form-control"
                                    name="role"
                                    id="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Chọn quyền cho tài khoản</option>
                                    <option value="1">Admin</option>
                                    <option value="2">Lễ tân</option>
                                    <option value="3">Quản lý</option>
                                    <option value="4">Khách hàng</option>
                                </select>
                                {errors.role && <div className="text-danger">{errors.role}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Chọn trạng thái</label>
                                <select className="form-control" value={formData.status_id} name='status_id' id="status_id" onChange={handleChange}>
                                    <option >Chọn trạng thái cho tài khoản</option>
                                    <option value="1">Hoạt động</option>
                                    <option value="2">Ngưng hoạt động</option>
                                </select>
                                {errors.status_id && <div className="text-danger">{errors.status_id}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="images" className="form-label">Ảnh</label>
                                <input onChange={handleChange} type="file" className="form-control" name='images' id="images" />
                                {errors.images && <div className="text-danger">{errors.images}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            {
                                imageOld ?
                                    <div className="image-preview d-flex justify-cimagesontent-around flex-wrap">
                                        <img
                                            src={imageOld}
                                            alt={`Preview`}
                                            className="img-thumbnail"
                                            width="100"
                                        />
                                    </div> : ""
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>Hủy</button>
                    <button type="submit" className="btn btn-primary">Sửa</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalEdit;
