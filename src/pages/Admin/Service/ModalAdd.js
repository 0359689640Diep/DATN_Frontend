import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Notification } from '../../../components/Response';
import ValidateService from '../../../validation/Service';
import { postServiceAdmin } from '../../../services/Services';


const ModalAdd = (props) => {
    const { show, handleClose, onDataUpdated, roomTypes , statusData} = props;

    const [formData, setFormData] = useState({
        name: "",
        room_type_id: "",
        description: "",
        price: "",
        status_id: ""
    })
    const [errors, setErrors] = useState({}); // State lưu lỗi

    // lắng nghe sự kiện change của 1 thẻ
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật dữ liệu form
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Xác thực toàn bộ form nhưng chỉ cập nhật lỗi cho trường hiện tại
        const { error } = ValidateService.validate({ ...formData, [name]: value }, { abortEarly: false });


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

        const { error } = ValidateService.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors); // Cập nhật tất cả lỗi
        } else {
            setErrors({}); // Xóa hết lỗi nếu tất cả đều hợp lệ
            const response = await postServiceAdmin(formData);
            switch (response.status) {
                case 201:
                    Notification("success", response.data.message);
                    handleClose();
                    setFormData({
                        name: "",
                        room_type_id: "",
                        description: "",
                        price: "",
                        status_id: ""
                    });
                    onDataUpdated();
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

    return (
        <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thêm dịch vụ
                </Modal.Title>
            </Modal.Header>
            <form className="modal-content bg-light-subtle" onSubmit={handleSubmitAdd}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Tên dịch vụ</label>
                                <input value={formData.name} type="text" className="form-control" name='name' id="name" onChange={handleChange} />
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Giá dịch vụ</label>
                                <input value={formData.price} type="number" className="form-control" name='price' id="price" onChange={handleChange} />
                                {errors.price && <div className="text-danger">{errors.price}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="room_type_id" className="form-label">Loại phòng</label>
                                <select value={formData.room_type_id} className="form-control rounded" name='room_type_id' id="room_type_id" onChange={handleChange}>
                                    <option value="">Chọn loại phòng</option>
                                    {roomTypes.map((roomType) => (
                                        <option key={roomType.id} value={roomType.id}>
                                            {roomType.type}
                                        </option>
                                    ))}
                                </select>
                                {errors.room_type_id && <div className="text-danger">{errors.room_type_id}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="status_id" className="form-label">Trạng thái</label>
                                <select value={formData.status_id} className="form-control rounded" name='status_id' id="status_id" onChange={handleChange}>
                                    <option value="">Chọn trạng thái</option>
                                    <option value="1">Hoạt động</option>
                                    <option value="2">Ngưng hoạt động</option>
                                </select>
                                {errors.status_id && <div className="text-danger">{errors.status_id}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <textarea onChange={handleChange} style={{ height: "100px" }} className="form-control" placeholder="Ví dụ: Nhà mình có 2 người lớn và 1 trẻ em....." name="description" ></textarea>
                                <label htmlFor="floatingTextarea2">Mô tả yêu cầu</label>
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
    )
}

export default ModalAdd;