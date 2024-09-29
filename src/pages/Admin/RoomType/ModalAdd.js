import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Notification } from '../../../components/Response';
import ValidateRoomType from '../../../validation/RoomType';
import { postRoomType } from '../../../services/Admin/RoomType';

const ModalAdd = (props) => {
    const { show, handleClose, onDataUpdated } = props;

    const [formData, setFormData] = useState({
        type: "",
        images: []
    });
    const [errors, setErrors] = useState({}); // State lưu lỗi

    // Xử lý việc xóa ảnh
    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = Array.from(formData.images).filter((_, index) => index !== indexToRemove);
        setFormData({ ...formData, images: updatedImages });
    }

    // lắng nghe sự kiện change của 1 thẻ
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "images") {
            setFormData((prev) => ({
                ...prev,
                [name]: Array.from(files), // Chuyển đổi files thành mảng các đối tượng file
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        // Xác thực toàn bộ form nhưng chỉ cập nhật lỗi cho trường hiện tại
        const formToValidate = {
            ...formData,
            [name]: name === "images" ? Array.from(files) : value, // Kiểm tra file object nếu là images
        };

        const { error } = ValidateRoomType.validate(formToValidate, { abortEarly: false });

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
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        // Xác thực toàn bộ form trước khi submit
        const { error } = ValidateRoomType.validate(formData, { abortEarly: false });
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
            formDataToSubmit.append('type', formData.type);
            formData.images.forEach((image, index) => {
                formDataToSubmit.append(`images[${index}]`, image); // Đính kèm file ảnh
            });
            

            const response = await postRoomType(formDataToSubmit); // Gửi formData

            switch (response.status) {
                case 200:
                    Notification("success", response.data.message);
                    handleClose();
                    setFormData({
                        type: "",
                        images: []
                    });
                    onDataUpdated();
                    break;
                case 400:
                    Notification("warning", response.data.message);
                    break;
                default:
                    Notification("error", "Hệ thống đang bảo trì");
                    break;
            }
        }
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thêm loại phòng
                </Modal.Title>
            </Modal.Header>
            <form className="modal-content bg-light-subtle" onSubmit={handleSubmitAdd}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Loại phòng</label>
                                <input value={formData.type} type="text" className="form-control" name='type' id="type" onChange={handleChange} />
                                {errors.type && <div className="text-danger">{errors.type}</div>}
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
                            <div className="image-preview d-flex justify-content-around flex-wrap">
                                {Array.from(formData.images).map((image, index) => (
                                    <div key={index} className="position-relative m-2">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Preview ${index}`}
                                            className="img-thumbnail"
                                            width="100"
                                        />
                                        <button
                                            type="button"
                                            className="btn position-absolute top-0 end-0"
                                            onClick={() => handleRemoveImage(index)}
                                            style={{ transform: 'translate(50%, -50%)' }} // Điều chỉnh vị trí của icon x
                                        >
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>Hủy</button>
                    <button type="submit" className="btn btn-primary">Thêm</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalAdd;
