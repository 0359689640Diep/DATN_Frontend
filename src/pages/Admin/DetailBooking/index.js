import { useEffect, useState } from "react";
import className from "../../../components/ClassName";
import detail from "./detail.module.scss";
import { Notification } from "../../../components/Response";
import { useParams } from "react-router-dom";
import { getBookingDetail } from "../../../services/Bookings";
import Modal from 'react-bootstrap/Modal';
import { getAccount } from "../../../services/Account";
import { addUsersToServiceAdmin } from "../../../services/Services";

const DetailBooking = () => {
    const cx = className(detail);
    const { id } = useParams(); // Lấy id từ URL
    const [data, setData] = useState([]); // Dữ liệu hiển thị
    const [users, setUsers] = useState([]); // Lưu dữ liệu loại phòng vào state
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const [idServiceBooking, setIdServiceBooking] = useState(0);

    const [formData, setFormData] = useState(
        {
            list_users: []
        }
    );

    const fetchUsers = async () => {
        const response = await getAccount({ status_id: 1 }); // Gọi hàm lấy loại phòng
        if (response.status >= 400 && response.status < 600) {
            Notification("error", response.data.message);
            if (response.status === 401) window.location.href = '/';
        } else {
            setUsers(response.data); // Cập nhật state sau khi có dữ liệu
        }
    };

    const fetchData = async () => {
        try {
            const response = await getBookingDetail(id);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    // lắng nghe sự kiện change của 1 thẻ
    const handleChange = (e) => {
        const { value } = e.target;

        // Tìm nhân viên đã được chọn
        const selectedUser = users.find(user => user.id === parseInt(value));

        // Kiểm tra xem đã chọn nhân viên chưa
        if (!selectedUser) {
            setErrors({ user_id: "Nhân viên không hợp lệ" });
            return;
        }

        // Kiểm tra nhân viên đã tồn tại trong formData.list_users chưa
        const checkUsers = formData.list_users.filter(user => user.user_id === selectedUser.id);

        if (checkUsers.length > 0) {
            setErrors({ user_id: "Nhân viên đã tồn tại" });
        } else {
            setErrors({ user_id: "" });
            setFormData((prev) => ({
                ...prev,
                list_users: [
                    ...prev.list_users,
                    {
                        user_id: selectedUser.id,
                        name: selectedUser.name,
                        booking_service_id: idServiceBooking
                    },
                ]
            }));
        }
    };


    const handleDelete = (user_id) => {
        setFormData((prev) => ({
            ...prev,
            list_users: prev.list_users.filter(user => user.user_id !== user_id)
        }));
    };


    useEffect(() => {
        fetchData();
        fetchUsers();
    }, []);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (id) => {
        setShow(true);
        setIdServiceBooking(id);
    }

    // lắng nghe sự kiện submit và gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await addUsersToServiceAdmin(formData);
        switch (response.status) {
            case 200:
                Notification("success", response.data.message);
                handleClose();
                setFormData({
                    service_id: id,
                    user_id: "",
                });
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

    };

    return (
        <div >
            <nav className="mb-2">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="/admin" className="fs-10 text-decoration-none"><strong>Trang chủ</strong></a>
                    </li>
                    <li><i className="bi bi-chevron-right fs-10 m-2"></i></li>
                    <li className="fs-10"><a href='/admin/service'><strong>Danh sách đơn hàng</strong></a></li>
                    <li><i className="bi bi-chevron-right fs-10 m-2"></i></li>
                    <li className="fs-10">Chi tiết đơn hàng</li>
                </ol>
            </nav>
            <div className={`${cx("cotent")} text-start`}>
                <h2>CHI TIẾT ĐƠN HÀNG</h2>
            </div>

            <div className={`${cx("cotent")} text-start`}>
                <h4>Lịch sử thanh toán</h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col text-center">STT</th>
                        <th className="col text-start">Mã giao dịch</th>
                        <th className="col text-end">Số tiền</th>
                        <th className="col text-start">Phương thức</th>
                        <th className="col text-start">Thời gian</th>
                        <th className="col text-start">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.payments && data.payments.length > 0 ?
                            data.payments.map((item, index) => (
                                <tr key={index}>
                                    <td className="col text-center">{index + 1}</td>
                                    <td className="col text-start">{item.code}</td>
                                    <td className="col text-end">{item.amount} đ</td>
                                    <td className="col text-start">{item.payment_method}</td>
                                    <td className="col text-start">{item.payment_date}</td>
                                    <td>
                                        <p style={{ color: item.status_color }}>{item.status_name}</p>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="9" className="text-center text-danger">Không có dữ liệu</td>
                            </tr>

                    }
                </tbody>
            </table>

            <div className={`${cx("cotent")} text-start my-3`}>
                <h4>Danh sách dịch vụ đã sử dụng</h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col text-center">STT</th>
                        <th className="col text-start">Tên</th>
                        <th className="col text-end">Số lượng</th>
                        <th className="col text-end">Giá</th>
                        <th className="col text-start">Thời gian</th>
                        <th className="col text-start">Trạng thái</th>
                        <th className="col text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.service_booking && data.service_booking.length > 0 ?
                            data.service_booking.map((item, index) => (
                                <tr key={index}>
                                    <td className="col text-center">{index + 1}</td>
                                    <td className="col text-start">{item.service_name}</td>
                                    <td className="col text-end">{item.quanlity_service}</td>
                                    <td className="col text-end">{item.total_price}</td>
                                    <td className="col text-start">{item.created_at}</td>
                                    <td>
                                        <p style={{ color: item.status_color }}>{item.status_name}</p>
                                    </td>
                                    <td className="col text-center" onClick={() => handleShow(item.id)}><i className="bi bi-person-add fs-4" title="Thêm nhân viên phụ trách"></i></td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="9" className="text-center text-danger">Không có dữ liệu</td>
                            </tr>

                    }
                </tbody>
            </table>

            <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Thêm nhân viên phụ trách
                    </Modal.Title>
                </Modal.Header>
                <form className="modal-content bg-light-subtle" onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label htmlFor="user_id" className="form-label">Nhân viên phụ trách</label>
                                    <select value={formData.user_id} className="form-control rounded" name='user_id' id="user_id" onChange={handleChange}>
                                        <option value="">Chọn nhân viên</option>
                                        {users.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && <div className="text-danger">{errors.user_id}</div>}
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="col text-center">STT</th>
                                            <th className="col text-start">Tên</th>
                                            <th className="col text-center">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.list_users && formData.list_users.length > 0
                                            ? formData.list_users.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="col text-center">{index + 1}</td>
                                                    <td className="col text-start">{item.name}</td>
                                                    <td className="col text-center">
                                                        <button type="button" className="btn bg-light-subtle text-danger ms-2" onClick={() => handleDelete(item.user_id)} >
                                                            <i className="bi bi-trash"></i>
                                                            <span className="ms-1">Xóa</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>Hủy</button>
                        <button type="submit" className="btn btn-primary">Lưu</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default DetailBooking;
