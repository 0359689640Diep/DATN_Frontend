import { useEffect, useState } from "react";
import className from "../../../components/ClassName";
import detail from "./detail.module.scss";
import CustomerNav from "../../../components/CustomerNav";
import { confirmBooking, getBooking, getBookingDetail} from "../../../services/Customers/Bookings";
import {getReviewsByIdBookings, postReviews } from "../../../services/Customers/Reviews";
import { Notification } from "../../../components/Response";
import { useParams } from "react-router-dom";
import HandleStar from "../../../components/Star/HandleStar";

const DetailTransactionHistory = () => {
    const cx = className(detail);
    const { id } = useParams(); // Lấy id từ URL
    const [data, setData] = useState([]); // Dữ liệu hiển thị
    const [dataReviews, setDataReviews] = useState([]);
    const [formData, setFormData] = useState({
        "bookings_id": id,
        "rating": 0,
        "comment": ""
    });

    const listNav = [
        { icon: 'house', title: 'Trang chủ', url: '/' },
        { icon: 'chevron-right', title: 'Lịch sử giao dịch', url: `/transaction-history` },
        { icon: 'chevron-right', title: 'Chi tiết lịch sử giao dịch', url: '#' },

    ];

    const fetchData = async () => {
        try {
            const response = await getBookingDetail(id);
            if (response.status === 200) {
                setData(response.data);
            }
            const responseReviewsByIdBookings = await getReviewsByIdBookings(id);
            if (responseReviewsByIdBookings.status === 200) {
                setDataReviews(responseReviewsByIdBookings.data);
            }
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    const handleStarClick = (starCount) => {
        setFormData(
            {
                ...formData,
                "rating": starCount,
            }
        );
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật dữ liệu form
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmitAdd = async (e) => {
        e.preventDefault();

        const response = await postReviews(formData);
        switch (response.status) {
            case 200:
                Notification("success", response.data.message);
                setFormData({
                    "bookings_id": id,
                    "rating": 0,
                    "comment": ""
                });
                fetchData();
                break;

                default:
                Notification("error", response.data.message);
                break;
        }
    };
    useEffect(() => {
        fetchData(); // Lấy dữ liệu ban đầu khi component render
    }, []);
    console.log(dataReviews && dataReviews.comment  )

    return (
        <div style={{ padding: "1% 17%" }}>
            <CustomerNav listNav={listNav} />
            <div className={`${cx("cotent")} text-center`}>
                <h2>CHI TIẾT LỊCH SỬ GIAO DỊCH</h2>
            </div>

            <div className={`${cx("title")} d-flex justify-content-between align-items-center py-5`}>
                <div className={cx("product")}>
                    <div className={`${cx("product-title")} d-flex align-items-center`}>
                        <span className="me-2">Mã đơn hàng: </span>
                        <span>{data.id}</span>
                    </div>
                    <div className={`${cx("product-title")} d-flex align-items-center`}>
                        <span className="me-2">Loại phòng: </span>
                        <span>{data.room_type?.type}</span>
                    </div>
                    <div className={`${cx("product-title")} d-flex align-items-center`}>
                        <span className="me-2">Giá: </span>
                        <span>{data.room_type?.price_per_night} đ</span>
                    </div>
                    <div className={`${cx("product-title")} d-flex align-items-center`}>
                        <span className="me-2">Tiền cọc: </span>
                        <span>{data.deposit_amount} đ</span>
                    </div>
                    <div className={`${cx("product-title")} d-flex align-items-center`}>
                        <span className="me-2">Phụ phí: </span>
                        <span>{data.surcharge} đ</span>
                    </div>
                    <div className={`${cx("product-title")} d-flex align-items-center`}>
                        <span className="me-2">Thanh toán: </span>
                        <span>{data.total_price} đ</span>
                    </div>
                    <div className={cx('star')}><HandleStar star={5} onStarClick={handleStarClick} /></div>
                </div>
                <div className={cx("images")}>
                    <img src={data.room_type?.room_images[0]?.image_url} alt={data.room_type?.room_images[0]?.description} />
                </div>
            </div>

            <div className={`${cx("cotent")} text-center`}>
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
                        data.payments &&data.payments.length > 0 ?
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

            <div className={`${cx("cotent")} text-center my-3`}>
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

                    </tr>
                </thead>
                <tbody>
                    {
                        data.service_booking &&data.service_booking.length > 0 ?
                        data.service_booking.map((item, index) => (
                                <tr key={index}>
                                    <td className="col text-center">{index + 1}</td>
                                    <td className="col text-end">{item.service_name}</td>
                                    <td className="col text-end">{item.quanlity_service}</td>
                                    <td className="col text-start">{item.total_price}</td>
                                    <td className="col text-start">{item.created_at}</td>
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

            <div className={`${cx("cotent")} text-center my-3`}>
                <h4>Hãy cho chúng tôi biết cảm nhận của bạn</h4>
            </div>
            <form  onSubmit={handleSubmitAdd}>
                <div className="col-md-12 my-4">
                    <div className="form-floating">
                        <textarea style={{ height: "300px" }}
                        className="form-control" 
                        defaultValue={dataReviews && dataReviews.comment ? dataReviews.comment : "Ví dụ: Dịch vụ rất tốt tôi rất hài lòng" } 
                        onChange={handleChange}
                        name="comment" ></textarea>
                    </div>
                </div>
                <button type="submit" className={`${cx("button")} btn`}>Gửi</button>
            </form>
        </div>
    );
};

export default DetailTransactionHistory;
