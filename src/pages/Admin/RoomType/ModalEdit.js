import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { Notification } from '../../../components/Response';
import { putRoomType } from '../../../services/Admin/RoomType';
import ValidateRoomType from '../../../validation/RoomType';


const ModalEdit = (props) => {
    const { show, handleClose, onDataUpdated, dataEdit } = props;
    const [id, setId] = useState(0);
    const [imageOld, setImageOld] = useState([]);
    const [formData, setFormData] = useState({
        type: "",
        images: [],
        image_id: [],
    }); 

    useEffect(() => {
        if (dataEdit) {
            setFormData({
                type: dataEdit.type || "",
            });
            setImageOld(dataEdit.room_images || [])
            setId(dataEdit.id);
        }
    }, [dataEdit]);

    const [errors, setErrors] = useState({});

    // Xử lý thay đổi cho trường văn bản
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const { error } = ValidateRoomType.validate({ ...formData, [name]: value }, { abortEarly: false });

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
            }
        }
    };

    // Xử lý thay đổi cho input ảnh
    const handleImageChange = (e, imageId) => {
        const { name, files } = e.target;
    
        // Danh sách các loại MIME cho phép
        const allowedTypes = ["image/jpeg", "image/png"];
        const file = files[0]; // Lấy file đầu tiên
    
        // Kiểm tra loại file
        if (!file || !allowedTypes.includes(file.type)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [imageId]: "File phải là ảnh (jpg, png)",
            }));
            return;
        }
    
        // Nếu file hợp lệ, tạo preview và cập nhật formData
        const newImage = {
            preview: URL.createObjectURL(file),
            file, // Lưu file để upload sau này nếu cần
        };
    
        setFormData((prev) => ({
            ...prev,
            [name]: Array.from(files), 
            image_id: prev.image_id ? [...prev.image_id, imageId] : [imageId], 
        }));
    
        // Cập nhật imageOld: nếu imageId tồn tại, thay thế image_url bằng preview
        setImageOld((prevImages) =>
            prevImages.map((img) =>
                img.id === imageId
                    ? { ...img, image_url: newImage.preview } // Thay thế image_url
                    : img
            )
        );
    
        // Xóa lỗi nếu file hợp lệ
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[imageId];
            return newErrors;
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('type', formData.type);
        console.log(formData.images);
        if(formData.images && formData.image_id){
            formData.images.forEach((image, index) => {
                console.log(image);
                formDataToSubmit.append(`images[${index}]`, image); // Đính kèm file ảnh
            });
            formData.image_id.forEach((id) => {
                formDataToSubmit.append('image_id[]', id); 
            });
        }
        setErrors({});
        const response = await putRoomType(formDataToSubmit, id);
        switch (response.status) {
            case 200:
                Notification("success", response.data.message);
                handleClose();
                setFormData({
                    type: "",
                    images: [],
                    image_id: [],
                });
                onDataUpdated();
                break;
            case 400:
                Notification("error", response.data.message);
                break;
            default:    
                Notification("error", "Hệ thống đang bảo trì");
                break;
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
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Loại phòng</label>
                                <input value={formData.type} type="text" className="form-control" name='type' id="type" onChange={handleChange} />
                                {errors.type && <div className="text-danger">{errors.type}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="image-preview d-flex justify-content-around flex-wrap">
                                {imageOld.map((item, index) => (
                                    <div key={index} className="position-relative m-2">
                                        <img
                                            src={item.image_url}
                                            alt={item.description}
                                            className="img-thumbnail"
                                            width="100"
                                        />
                                        <input type="file" onChange={(e) => handleImageChange(e, item.id)} className="form-control" name={`images`} />
                                        {errors[item.id] && <div className="text-danger">{errors[item.id]}</div>}
                                    </div>
                                ))}
                            </div>
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