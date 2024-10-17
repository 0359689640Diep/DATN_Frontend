import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import className from "../../../components/ClassName";
import style from "./style.module.scss";
import CustomerNav from "../../../components/CustomerNav";
import { getRoomTypeById } from "../../../services/RoomType";
import { getUsers } from "../../../services/Users";
import { getServices } from "../../../services/Services";
import ValidateOrders from "../../../validation/Orders";
import { postBooking } from "../../../services/Bookings";
import { Notification } from "../../../components/Response";

const BookingsCustomer = () => {
    const cx = className(style);
    const { id } = useParams(); // Lấy id từ URL
    const listNav = [
        { icon: 'house', title: 'Trang chủ', url: '/' },
        { icon: 'chevron-right', title: 'Chi tiết phòng', url: `/detail/${id}` },
        { icon: 'chevron-right', title: 'Thanh toán', url: '#' },
    ];
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        check_in_date: '',
        check_out_date: '',
        note: "",
        room_type_id: "",
        actual_number_people: "",
        total_price: "",
        type: 1,
        typeRoom: "",
        service: [],

    });
    const [errors, setErrors] = useState({});

    // Trạng thái dữ liệu
    const [dataServices, setDataServices] = useState();
    const [activeServices, setActiveServices] = useState([]);

    const [loading, setLoading] = useState(true);

    async function getDataRoomType() {
        const response = await getRoomTypeById(id);
        if (response.status === 200) {
            const { reviews, average_rating, ...data } = response.data;
            const deposit = data.price_per_night * 0.5 ?? "0"
            setFormData(prevFormData => ({
                ...prevFormData,
                typeRoom: data.type,
                room_type_id: data.id,
                actual_number_people: data.defaul_people,
                total_price: deposit,
                price_per_night: data.price_per_night,
                deposit: deposit,
                title: data.title,
                address: data.address

            }));
        }
    }

    async function getDataUser() {
        const response = await getUsers();
        if (response.status === 200) {
            const data = response.data;
            setFormData(prevFormData => ({
                ...prevFormData,
                name: data.name,
                email: data.email,
                phone: data.phone,
            }));
        }
    }

    async function getDataServices() {
        const response = await getServices(id);
        if (response.status === 200) {
            setDataServices(response.data);

        }
    }

    // Gọi các hàm API và set loading khi hoàn tất
    useEffect(() => {
        const fetchData = async () => {
            await getDataRoomType();
            await getDataUser();
            await getDataServices();
            setLoading(false); // Dữ liệu đã tải xong
        };

        fetchData();
    }, );
    // Nếu đang loading, hiển thị loader hoặc giao diện chờ
    if (loading) {
        return <div>Loading...</div>;
    }

    // Phương thức để xử lý việc đăng ký dịch vụ
    const handleRegisterClick = (id, price, name) => {
        setActiveServices((prevActive) => {
            let newTotalPrice = formData.total_price;

            if (prevActive.includes(id)) {
                // Nếu dịch vụ đã được chọn, loại bỏ nó
                const updatedActive = prevActive.filter((serviceId) => serviceId !== id);

                // Lấy dịch vụ hiện tại để biết số lượng hiện tại
                const serviceToRemove = formData.service.find((service) => service.id === id);
                const totalServicePrice = serviceToRemove ? serviceToRemove.quanlity_service * price : price;

                // Trừ tổng giá theo số lượng hiện tại của dịch vụ
                newTotalPrice -= totalServicePrice;

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    total_price: newTotalPrice,
                    service: prevFormData.service.filter((service) => service.id !== id)
                }));

                return updatedActive;
            } else {
                // Nếu dịch vụ chưa được chọn, thêm vào
                const newService = {
                    id: id,
                    quanlity_service: 1,
                    total_price: price,
                    name: name
                };
                newTotalPrice += price;

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    total_price: newTotalPrice,
                    service: [...prevFormData.service, newService]
                }));

                return [...prevActive, id];
            }

        });
    };

    // Phương thức để xử lý thay đổi số lượng dịch vụ
    const handleQuantityChange = (id, price, event, name) => {
        const quantity = event.target.value;
        const prices = price * quantity;

        setFormData((prevFormData) => {
            const updatedServices = [...prevFormData.service];
            const existingServiceIndex = updatedServices.findIndex((service) => service.id === id);

            if (existingServiceIndex > -1) {
                updatedServices[existingServiceIndex] = {
                    id: id,
                    quanlity_service: quantity,
                    total_price: prices,
                    name: name
                };
            } else {
                updatedServices.push({
                    id: id,
                    quanlity_service: quantity,
                    total_price: prices,
                    name: name
                });
            }

            let newTotalPrice = formData.type === 1 ? Number(formData.deposit) : Number(formData.price_per_night);

            // Tính tổng giá bao gồm cả các dịch vụ
            newTotalPrice += updatedServices.reduce((acc, service) => acc + service.total_price, 0);

            return {
                ...prevFormData,
                total_price: newTotalPrice,
                service: updatedServices
            };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Nếu thay đổi field 'type', cập nhật total_price dựa trên 'type'
        if (name === "type") {
            setFormData((prev) => {
                // Lấy giá trị total_price mới dựa trên 'type' vừa thay đổi
                let newTotalPrice = value === "1" ? Number(prev.deposit) : Number(prev.price_per_night);

                // Cộng thêm tổng giá của các dịch vụ
                newTotalPrice += prev.service.reduce((acc, service) => acc + service.total_price, 0);

                return {
                    ...prev,
                    [name]: value, // Cập nhật 'type'
                    total_price: newTotalPrice, // Cập nhật 'total_price'
                };
            });
        } else {
            // Cập nhật các field khác bình thường
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        // Validation
        const { error } = ValidateOrders.validate({ ...formData, [name]: value }, { abortEarly: false });
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
        const { error } = ValidateOrders.validate(formData, { abortEarly: false });

        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors);
        } else {
            setErrors({});
            const response = await postBooking(formData);
            console.log(response);
            switch (response.status) {
                case 200:
                    const url = response.data.data;
                    window.location.replace(url);
                    break;
                default:
                    Notification("error", response.data.message);
                    break;
            }
        }
    };


    // Khi dữ liệu đã sẵn sàng, hiển thị giao diện chính
    return (
        <div style={{ padding: "1% 17%" }}>
            <CustomerNav listNav={listNav} />

            <div className={cx("title")}><h3><strong>THANH TOÁN ĐẶT PHÒNG</strong></h3></div>

            <div className="py-2 d-flex justify-content-between">
                <form className={`${cx("form")} p-2`} onSubmit={handleSubmitAdd}>
                    <div className={`${cx("form-title")}`}>
                        <h4><strong>Thông tin liên hệ</strong></h4>
                        <p>Chúng tôi sẽ liên hệ với bạn để xác nhận Booking này!</p>
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
                                <div className={`${cx("warnings")}`}>
                                    <i className="bi bi-exclamation-circle"></i>
                                    <span className="mx-2" >Ngày bạn đến .</span>
                                </div>
                                <input value={formData.check_in_date} type="date" className="form-control" placeholder='Ngày bạn đến' name='check_in_date' id="check_in_date" onChange={handleChange} />
                                {errors.check_in_date && <div className="text-danger">{errors.check_in_date}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <div className={`${cx("warnings")}`}>
                                    <i className="bi bi-exclamation-circle"></i>
                                    <span className="mx-2" >Ngày bạn đi .</span>
                                </div>
                                <input value={formData.check_out_date} type="date" className="form-control" placeholder='Ngày bạn đi' name='check_out_date' id="check_out_date" onChange={handleChange} />
                                {errors.check_out_date && <div className="text-danger">{errors.check_out_date}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <textarea onChange={handleChange} style={{ height: "200px" }} className="form-control" placeholder="Ví dụ: Nhà mình có 2 người lớn và 1 trẻ em....." name="note" ></textarea>
                                <label htmlFor="floatingTextarea2">Mô tả yêu cầu</label>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <button type="submit" className={`${cx("button")} btn`}>Xác nhận thanh toán</button>
                    </div>
                </form>
                <div className={`${cx("content")} p-2`}>
                    <div className={`${cx("title-content")} text-start`}>
                        <h3><strong>Chi phí dự kiến</strong></h3>
                    </div>
                    <div className={`${cx('main')}`}>
                        <div className={`${cx("product-title")} d-flex align-items-center`}>
                            <span className="me-2">Loại phòng: </span>
                            <span>{formData?.typeRoom}</span>
                        </div>
                        <div className={`${cx("product-title")} d-flex align-items-center`}>
                            <span className="me-2">Giá phòng: </span>
                            <span>{formData?.price_per_night ?? "0"} đ</span>
                        </div>
                        <div className={`${cx("product-title")} d-flex align-items-center`}>
                            <span className="me-2">Số tiền đặt cọc: </span>
                            <span>{formData?.deposit}  đ</span>
                        </div>
                        <div className={`${cx("product-title")} d-flex align-items-center`}>
                            <div className="form-check">
                                <input className="form-check-input" value="2" type="radio" name="type" id="type1" onChange={handleChange} checked={Number(formData?.type) === 2} />
                                <label className="form-check-label" htmlFor="type1">
                                    Thanh toán luôn
                                </label>
                            </div>
                            <div className="form-check mx-3">
                                <input className="form-check-input" value="1" type="radio" name="type" id="type2" onChange={handleChange} checked={Number(formData?.type) === 1} />
                                <label className="form-check-label" htmlFor="type2">
                                    Cọc giữ phòng
                                </label>
                            </div>
                        </div>
                        <div className={`${cx("product-title")} d-flex align-items-center`}>
                            <span className="me-2">Tổng thanh toán: </span>
                            <span>{formData?.total_price} đ</span>
                        </div>

                    </div>

                    <div className={`${cx("product-detail")}`}>
                        <div className={`${cx("title-product-detail")} text-start`}>
                            <h3><strong>Thông tin phòng</strong></h3>
                        </div>
                        <div className={`${cx('product-content-detail')} d-flex justify-content-between align-items-center`}>
                            <img src="http://127.0.0.1:8000/storage/uploads/SHlMkjM3CxVauUAhpv04Rn0NgjuOKVKy1ObqchPc.jpg" alt="img" />
                            <div className={`${cx("product-content-detail-main")}`}>
                                <div className={`${cx("detail")} d-flex align-items-center`}>
                                    <span className="me-2">Loại phòng: </span>
                                    <span>{formData?.typeRoom}</span>
                                </div>
                                <div className={`${cx("detail")} d-flex align-items-center`}>
                                    <span className="me-2">Số lượng người tối đa:  </span>
                                    <span>{formData?.actual_number_people ?? "0"} người </span>
                                </div>
                                <div className={`${cx("detail")} d-flex align-items-center`}>
                                    <span>{formData?.title ?? "Rất hân hạnh phục vụ quý khách"} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${cx("service")} p-3`}>
                <div className={`${cx("title-service")} text-start`}>
                    <h3><strong>Các dịch vụ kèm theo</strong></h3>
                </div>
                <div className={`${cx("list-service")} `}>
                    {
                        dataServices?.map((item, index) => {
                            const isActive = activeServices.includes(item.id);
                            return (
                                <div key={index} className={`${cx("service")} car`}>
                                    {/* <img src="http://127.0.0.1:8000/storage/uploads/SHlMkjM3CxVauUAhpv04Rn0NgjuOKVKy1ObqchPc.jpg" className="card-img-top" alt="http://127.0.0.1:8000/storage/uploads/SHlMkjM3CxVauUAhpv04Rn0NgjuOKVKy1ObqchPc.jpg" /> */}
                                    <div className={`${cx("service-body")} card-body`}>
                                        <h4 className="card-title">Tên: {item.name}</h4>
                                        <p className="card-text">{item.description}</p>
                                        <h5 className="card-title">Giá: {item.price} đ</h5>

                                        {/* Nút để hiển thị hoặc ẩn phần input */}
                                        <button className="btn" onClick={() => handleRegisterClick(item.id, item.price, item.name)}>
                                            {isActive ? 'Đã đăng ký' : 'Đăng ký ngay'}
                                        </button>

                                        {/* Nhóm input hiển thị khi nút được nhấp */}
                                        <div className={`${cx("service-body-suscess")} input-group mb-3 ${isActive ? '' : 'd-none'}`}>
                                            <div className="input-group-text">
                                                <input
                                                    className="form-check-input mt-0"
                                                    defaultChecked={true}
                                                    name="service_id"
                                                    type="checkbox"
                                                    defaultValue={item.id}
                                                />
                                            </div>
                                            <input
                                                type="number"
                                                min={0}
                                                className="form-control"
                                                name="quanlity_service"
                                                defaultValue={"1"}
                                                onChange={(e) => handleQuantityChange(item.id, item.price, e, item.name)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    );
};

export default BookingsCustomer;
