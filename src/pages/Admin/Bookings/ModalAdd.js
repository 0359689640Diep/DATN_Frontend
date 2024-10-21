import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { Notification } from '../../../components/Response';
import ValidateService from '../../../validation/Service';
import { getServices, postServiceAdmin } from '../../../services/Services';
import { getRoom } from '../../../services/Room';
import className from '../../../components/ClassName';
import style from "./style.module.scss";
import { FormatNumber, RemoveCharacters } from '../../../components/Common';
import { ValidateBookings } from '../../../validation/Bookings';
import { checkInBookingAdmin } from '../../../services/Bookings';

const ModalAdd = (props) => {
    const cx = className(style);
    const { show, handleClose, onDataUpdated, dataBooking, roomTypes } = props;
    const [room, setRoom] = useState([]);
    const [id, setId] = useState(0);

    const [formData, setFormData] = useState({
        check_in_date: '',
        check_out_date: '',
        note: "",
        room_type_id: "",
        actual_number_people: "",
        total_price: "",
        type: 1,
        typeRoom: "",
        room_id: "",
        surcharge: "",
        deposit_amount: "",
        payments_amount: "",
        status: "",
        price: "",
        service: [],
    })
    const [errors, setErrors] = useState({}); // State lưu lỗi
    const [dataServices, setDataServices] = useState();
    const [activeServices, setActiveServices] = useState([]);

    const fetchRoom = async (params) => {
        const response = await getRoom(params); // Gọi hàm lấy loại phòng
        if (response.status >= 400 && response.status < 600) {
            Notification("error", response.data.message);
            if (response.status === 401) window.location.href = '/';
        } else {
            setRoom(response.data); // Cập nhật state sau khi có dữ liệu
        }
    };
    async function getDataServices(id) {
        const response = await getServices(id);
        if (response.status === 200) {
            setDataServices(response.data);

        }
    }

    useEffect(() => {
        if (dataBooking) {
            setFormData({
                check_in_date: dataBooking.check_in_date || "",
                check_out_date: dataBooking.check_out_date || "",
                note: dataBooking.note || "",
                room_type_id: dataBooking.room_type_id || "",
                actual_number_people: dataBooking.actual_number_people || "",
                total_price: dataBooking.total_price || "",
                type: dataBooking.type || "",
                surcharge: dataBooking.surcharge || "",
                deposit_amount: dataBooking.deposit_amount || "",
                typeRoom: dataBooking.room_type?.type ?? '',
                payments_amount: Array.isArray(dataBooking.payments) && dataBooking.payments.length > 0
                    ? dataBooking.payments[0].amount
                    : 0,
                status: dataBooking.status,
                room_id: "",
                service: dataBooking.service_booking,
                price: 0
            });
            setId(dataBooking.id || 0);
            if (dataBooking.service_booking) {
                const ids = dataBooking.service_booking.map(service => service.id);
                setActiveServices(ids);
            }
            const roomTypeId = dataBooking.room_type_id;
            if (roomTypeId) {
                fetchRoom({ room_type_id: roomTypeId });
                getDataServices(roomTypeId);
            }
        }
    }, [dataBooking]);

    // lắng nghe sự kiện change của 1 thẻ
    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === "room_type_id"){
            fetchRoom({ room_type_id:value});
        }

        // Cập nhật dữ liệu form
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Xác thực toàn bộ form nhưng chỉ cập nhật lỗi cho trường hiện tại
        const { error } = ValidateBookings.validate({ ...formData, [name]: value }, { abortEarly: false });

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

        const { error } = ValidateBookings.validate(formData, { abortEarly: false });
        console.log(error);
        if (error) {
            const newErrors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors); // Cập nhật tất cả lỗi
        } else {
            setErrors({}); // Xóa hết lỗi nếu tất cả đều hợp lệ
            const response = await checkInBookingAdmin(formData, id);
            console.log(response);
            switch (response.status) {
                case 200:
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

    // Phương thức để xử lý việc đăng ký dịch vụ
    const handleRegisterClick = (id, price, name) => {
        setActiveServices((prevActive) => {
            let newTotalPrice = RemoveCharacters(formData.total_price);
            let payments_amount = RemoveCharacters(formData.payments_amount);
            // newTotalPrice = Number(newTotalPrice) - Number(payments_amount);
            // console.log(newTotalPrice);
            if (prevActive.includes(id)) {
                // Nếu dịch vụ đã được chọn, loại bỏ nó
                const updatedActive = prevActive.filter((serviceId) => serviceId !== id);

                // Lấy dịch vụ hiện tại để biết số lượng hiện tại
                const serviceToRemove = formData.service.find((service) => service.id === id);
                const totalServicePrice = serviceToRemove ? serviceToRemove.quanlity_service * price : price;

                // Trừ tổng giá theo số lượng hiện tại của dịch vụ
                newTotalPrice -= totalServicePrice;
                let newPrice = newTotalPrice - payments_amount;
                newTotalPrice = FormatNumber(newTotalPrice);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    price: newPrice,
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
                let newPrice = newTotalPrice - payments_amount;
                newTotalPrice = FormatNumber(newTotalPrice);
                newPrice = FormatNumber(newPrice);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    price: newPrice,
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

    return (
        <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Đăng ký phòng cho khách hàng
                </Modal.Title>
            </Modal.Header>
            <form className="modal-content bg-light-subtle" onSubmit={handleSubmitAdd}>
                <Modal.Body>
                    <div className="row">
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
                                <label htmlFor="room_type_id" className="form-label">Phòng</label>
                                <select
                                    value={formData.room_id}
                                    className="form-control rounded"
                                    name="room_id"
                                    id="room_id"
                                    onChange={handleChange}
                                >
                                    <option value="">Chọn phòng</option>
                                    {room.map((room) => (
                                        <option
                                            key={room.id}
                                            value={room.id}
                                            style={{ "color": room.status.color }} // Đặt style đúng cú pháp
                                        >
                                            Số phòng: {room.number} - Trạng thái: {room.status.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.room_id && <div className="text-danger">{errors.room_id}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="actual_number_people" className="form-label">Số lượng người thực tế</label>
                                <input value={formData.actual_number_people} type="number" className="form-control" name='actual_number_people' id="actual_number_people" onChange={handleChange} />
                                {errors.actual_number_people && <div className="text-danger">{errors.actual_number_people}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="surcharge" className="form-label">Phụ phí</label>
                                <input value={formData.surcharge} type="number" className="form-control" name='surcharge' id="surcharge" onChange={handleChange} />
                                {errors.surcharge && <div className="text-danger">{errors.surcharge}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="total_price" className="form-label">Tổng giá</label>
                                <input value={formData.total_price} disabled type="text" className="form-control" name='total_price' id="total_price" onChange={handleChange} />
                                {errors.total_price && <div className="text-danger">{errors.total_price}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="deposit_amount" className="form-label">Số tiền cọc</label>
                                <input value={formData.deposit_amount} disabled type="text" className="form-control" name='deposit_amount' id="deposit_amount" onChange={handleChange} />
                                {errors.deposit_amount && <div className="text-danger">{errors.deposit_amount}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Số tiền cần thanh toán</label>
                                <input value={formData.price} disabled type="text" className="form-control" name='price' id="price" onChange={handleChange} />
                                {errors.price && <div className="text-danger">{errors.price}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="payments_amount" className="form-label">Số tiền đã thanh toán</label>
                                <input value={formData.payments_amount} disabled type="text" className="form-control" name='payments_amount' id="payments_amount" onChange={handleChange} />
                                {formData.status && <div style={{ color: formData.status.color }}>{formData.status.name}</div>}
                                {errors.payments_amount && <div className="text-danger">{errors.payments_amount}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="check_in_date"  className="form-label">Thời gian đến</label>
                                <input value={formData.check_in_date} disabled type="text" className="form-control" placeholder='Ngày bạn đến' name='check_in_date' id="check_in_date" onChange={handleChange} />
                                {errors.check_in_date && <div className="text-danger">{errors.check_in_date}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="check_out_date" className="form-label">Thời gian đi</label>
                                <input value={formData.check_out_date} disabled type="text" className="form-control" placeholder='Ngày bạn đi' name='check_out_date' id="check_out_date" onChange={handleChange} />
                                {errors.check_out_date && <div className="text-danger">{errors.check_out_date}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <textarea onChange={handleChange} style={{ height: "200px" }} defaultValue={formData.note} className="form-control" placeholder="Ví dụ: Nhà mình có 2 người lớn và 1 trẻ em....." name="note" ></textarea>
                                <label htmlFor="floatingTextarea2">Mô tả yêu cầu</label>
                            </div>
                        </div>
                        <div className="col-md-12">
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
                                                        <button type='button' className="btn" onClick={() => handleRegisterClick(item.id, item.price, item.name)}>
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
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>Hủy</button>
                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalAdd;