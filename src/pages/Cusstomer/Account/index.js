import { useEffect, useState } from "react";
import className from "../../../components/ClassName";
import style from "./style.module.scss";
import CustomerNav from "../../../components/CustomerNav";
import { Notification } from "../../../components/Response";
import { getUsers, updateUsers } from "../../../services/Customers/Users";

const Account = () => {
    const cx = className(style);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: "",
        image: "",
        password_new: "",
        password_old: "",
    });
    const [images, setImages] = useState("");
    const [errors, setErrors] = useState({});
    const listNav = [
        { icon: 'house', title: 'Trang chủ', url: '/' },
        { icon: 'chevron-right', title: 'Lịch sử giao dịch', url: '#' },

    ];

    const fetchData = async () => {
        try {
            const response = await getUsers();
            if (response.status === 200) {
                setFormData({
                    name: response.data.name || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    address: response.data.address || '',
                    password_new: '',
                    password_old: '',
                });
                setImages(response.data.image);
            }
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Lấy dữ liệu ban đầu khi component render
    }, []);

    // lắng nghe sự kiện change của 1 thẻ
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));
            setImages(URL.createObjectURL(file));
        } else if (name === "password_old") {
            let valueLength = value.length;
            if (valueLength < 8) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password_old: 'Mật khẩu cũ phải có ít nhất 8 ký tự',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password_old: '',
                }));
            }
        } else if (name === "password_new") {
            let valueLength = value.length;
            const passwordOldValue = formData.password_old; // Lấy giá trị của password_old từ formData
        
            if (valueLength < 8) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password_new: 'Mật khẩu mới phải có ít nhất 8 ký tự',
                }));
            } else if (value === passwordOldValue) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password_new: 'Mật khẩu mới không được trùng với mật khẩu cũ',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password_new: '',
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        // Tạo đối tượng FormData
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('phone', formData.phone);
        formDataToSubmit.append('address', formData.address);
        formDataToSubmit.append('image', formData.image);
        formDataToSubmit.append('password_new', formData.password_new);
        formDataToSubmit.append(`password_old`, formData.password_old);

        const response = await updateUsers(formDataToSubmit); // Gửi formData

        switch (response.status) {
            case 200:
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: "",
                    image: "",
                    password_new: "",
                    password_old: "",
                });
                fetchData();
                Notification("success", response.data.message);
                break;
            default:
                Notification("warning", response.data.message);
                break;
        }
    };


    return (
        <div style={{ padding: "1% 17%" }}>
            <CustomerNav listNav={listNav} />
            <div className={`${cx("cotent")} text-center mx-5`}>
                <h2>QUẢN LÝ TÀI KHOẢN CỦA BẠN </h2>
            </div>
            <form className={`${cx("form")} p-2`} onSubmit={handleSubmitAdd}>
                <div className={`${cx("form-title")}`}>
                    <h4><strong>Thông tin cá nhân</strong></h4>
                    <p>Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</p>
                </div>
                <div className={`${cx("form-content")} row`}>
                    <div className="col-md-12">
                        <div className="mb-3">
                            <div className={`${cx("warnings")}`}>
                                <i className="bi bi-exclamation-circle"></i>
                                <span className="mx-2" >Chúng tôi sẽ gửi mã xác nhận tới email này .</span>
                            </div>
                            <input value={formData?.email} type="email" className="form-control" placeholder='Nhập email' name='email' id="email" onChange={handleChange} />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3">
                            <div className={`${cx("warnings")}`}>
                                <i className="bi bi-exclamation-circle"></i>
                                <span className="mx-2" >Chúng tôi sẽ gửi mã xác nhận tới số điện thoại này .</span>
                            </div>
                            <input value={formData?.phone} type="number" className="form-control" placeholder='Nhập số điện thoại' name='phone' id="phone" onChange={handleChange} />
                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3">
                            <input value={formData?.name} type="text" className="form-control" placeholder='Nhập tên' name='name' id="name" onChange={handleChange} />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="mb-3">
                            <input value={formData?.address} type="text" className="form-control" placeholder='Nhập địa chỉ' name='address' id="address" onChange={handleChange} />
                            {errors.address && <div className="text-danger">{errors.address}</div>}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="mb-3">
                            <input value={formData.password_old} type="password" className="form-control" placeholder='Nhập mật khẩu cũ' name='password_old' id="password_old" onChange={handleChange} />
                            {errors.password_old && <div className="text-danger">{errors.password_old}</div>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3">
                            <input value={formData.password_new} type="password" className="form-control" placeholder='Nhập mật khẩu mới' name='password_new' id="password_new" onChange={handleChange} />
                            {errors.password_new && <div className="text-danger">{errors.password_new}</div>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3">
                            <div className={`${cx("warnings")}`}>
                                <i className="bi bi-exclamation-circle"></i>
                                <span className="mx-2" >Tải ảnh đại diện .</span>
                            </div>
                            <input type="file" className="form-control" placeholder='Nhập mật khẩu mới' name='image' id="image" onChange={handleChange} />
                            {errors.image && <div className="text-danger">{errors.image}</div>}
                        </div>
                        <div className="col-md-12">
                            <div className="image-preview d-flex justify-content-start">
                                {images ?
                                    <div className="position-relative m-2">
                                        <img
                                            src={images}
                                            alt={`Preview `}
                                            className="img-thumbnail"
                                            width="100"
                                        />
                                    </div>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <button type="submit" className={`${cx("button")} btn`}>Lưu thông tin</button>
                </div>
            </form>
        </div>
    );
};

export default Account;
