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
        price_per_night: "",
        defaul_people: "",
        title: "",
        description: "",
        description_detail: "",
        images: [],
        image_id: [],
    }); 

    useEffect(() => {
        if (dataEdit) {
            setFormData({
                type: dataEdit.type || "",
                price_per_night: dataEdit.price_per_night || "",
                defaul_people: dataEdit.defaul_people || "",
                title: dataEdit.title || "",
                description: dataEdit.description || "",
                description_detail: dataEdit.description_detail || "",
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
        formDataToSubmit.append('price_per_night', formData.price_per_night);
        formDataToSubmit.append('defaul_people', formData.defaul_people);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('description_detail', formData.description_detail);
        formDataToSubmit.append('title', formData.title);


        // Nếu có file ảnh, thêm vào formDataToSubmit
        if(formData.images && formData.image_id){
            formData.images.forEach((image, index) => {
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
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="price_per_night" className="form-label">Số tiền cho 1 đêm</label>
                                <input value={formData.price_per_night} type="number" className="form-control" name='price_per_night' id="price_per_night" onChange={handleChange} />
                                {errors.price_per_night && <div className="text-danger">{errors.price_per_night}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="defaul_people" className="form-label">Số người mặc định</label>
                                <input value={formData.defaul_people} type="number" className="form-control" name='defaul_people' id="defaul_people" onChange={handleChange} />
                                {errors.defaul_people && <div className="text-danger">{errors.defaul_people}</div>}
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
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Tiêu đề</label>
                                <input value={formData.title} type="text" className="form-control" name='title' id="type" onChange={handleChange} />
                                {errors.title && <div className="text-danger">{errors.title}</div>}
                            </div>
                        </div>
                        <div className="col-md-12 my-2">
                            <div className="form-floating">
                                <textarea onChange={handleChange} value={formData.description} style = {{height: "140px"}} className="form-control" placeholder="Viết mô tả của bạn vềf loại phòng này" name="description" ></textarea>
                                <label htmlFor="floatingTextarea2">Mô tả </label>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <textarea onChange={handleChange} value={formData.description_detail} style = {{height: "300px"}} className="form-control" placeholder="Viết mô tả của bạn vềf loại phòng này" name="description_detail" ></textarea>
                                <label htmlFor="floatingTextarea2">Chi tiết mô tả</label>
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
