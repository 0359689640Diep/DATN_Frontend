import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { Notification } from '../../../components/Response';
import {ValidateBannerEdit} from '../../../validation/Banner';
import { putBannersAdmin } from '../../../services/Banner';


const ModalEdit = (props) => {
    const { show, handleClose, onDataUpdated, dataEdit } = props;
    const [id, setId] = useState(0);
    const [imageOld, setImageOld] = useState("");
    const [formData, setFormData] = useState({
        status_id: "",
        images: ""
    });
    useEffect(() => {
        if (dataEdit) {
            setFormData({
                status_id: dataEdit.status_id || "",
            });
            setImageOld(dataEdit.image_url || "")
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

        const { error } = ValidateBannerEdit.validate(formData, { abortEarly: false });

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

    // lắng nghe sự kiện submit và gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Xác thực toàn bộ form trước khi submit
        const { error } = ValidateBannerEdit.validate(formData, { abortEarly: false });

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
            formDataToSubmit.append('status_id', formData.status_id);
            formDataToSubmit.append(`images`, formData.images); 


            const response = await putBannersAdmin(formDataToSubmit, id); // Gửi formData

            switch (response.status) {
                case 200:
                    Notification("success", response.data.message);
                    handleClose();
                    setFormData({
                        status_id: "",
                        images: []
                    });
                    onDataUpdated();
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
                    Sửa loại phòng
                </Modal.Title>
            </Modal.Header>
            <form className="modal-content bg-light-subtle" onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="row">
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
                                <input onChange={handleChange} type="file" className="form-control" multiple name='images' id="images" />
                                {errors.images && <div className="text-danger">{errors.images}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            {imageOld ?
                                <div className="image-preview d-flex justify-content-around flex-wrap">
                                    <div className="position-relative m-2">
                                        <img
                                            src={imageOld}
                                            alt={imageOld}
                                            className="img-thumbnail"
                                            width="100"
                                        />
                                    </div>
                                </div> 
                                : ""
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
