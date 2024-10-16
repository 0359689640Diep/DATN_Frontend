import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import className from "../../../components/ClassName";
import style from "./style.module.scss";
import CustomerNav from "../../../components/CustomerNav";
import CustomerSlibar from "../../../components/CustomerSlibar";
import Star from "../../../components/Star";
import { getRoomTypeById } from "../../../services/Customers/RoomType";
import checkToken from "../../../components/CheckToken";
import { Notification } from "../../../components/Response";

const DetailCustomer = () => {
    const cx = className(style);
    const { id } = useParams(); // Lấy id từ URL
    const listNav = [
        { icon: 'house', title: 'Trang chủ', url: '/' },
        { icon: 'chevron-right', title: 'Chi tiết phòng', url: '#' },
    ];

    // Trạng thái dữ liệu
    const [dataRoomType, setDataRoomType] = useState();
    const [dataReviews, setDataReviews] = useState();
    const [dataAverageRating, setDataAverageRating] = useState();
    const [loading, setLoading] = useState(true); // Trạng thái loading

    async function getDataRoomType() {
        const response = await getRoomTypeById(id);
        if (response.status === 200) {
            const {reviews, average_rating, ...data} = response.data;
            setDataRoomType(data);
            setDataAverageRating(average_rating);
            setDataReviews(reviews);

        }
    }

    // Gọi các hàm API và set loading khi hoàn tất
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDataRoomType();
                console.log(data); // Kiểm tra dữ liệu
                // Đảm bảo dữ liệu là một mảng trước khi sử dụng
                if (Array.isArray(data)) {
                    // Xử lý dữ liệu...
                }
            } catch (error) {
                console.error('Error fetching room types:', error);
            } finally {
                setLoading(false); // Dữ liệu đã tải xong
            }
        };
    
        fetchData();
    },);
    
    // Nếu đang loading, hiển thị loader hoặc giao diện chờ
    if (loading) {
        return <div>Loading...</div>;
    }

    const renderOrders = () => {
        const token  = checkToken();
        if (token) {
            let url = `/detail/payments/${id}`;
            window.location.replace(url.trim());
        }else{
            Notification("warning", "Vui lòng đăng nhập để sử dụng dịch vụ");
        }
    }

    // Khi dữ liệu đã sẵn sàng, hiển thị giao diện chính
    return (
        <div style={{ padding: "1% 17%" }}>
            <CustomerNav listNav={listNav} />
            <div className="py-2 d-flex justify-content-between">
                <CustomerSlibar />
                <div className={`${cx("content")}`}>
                    <div className={`${cx("title")} d-flex justify-content-between`}>
                        <div className={`${cx("content")}`}>
                            <h3><strong>Chi tiết {dataRoomType?.type ?? ""}</strong></h3>
                            <div className={cx('star')}><Star star={dataAverageRating} /></div>
                            <p>{dataRoomType?.title ?? ""}</p>
                        </div>
                        <button onClick={renderOrders} type="button" className="btn ">Đặt ngay</button>
                    </div>
                    <div className={`${cx('main')}`}>
                        <div id="carouselExample" className="carousel slide">
                            <div className={`${cx("carousel-inner")} carousel-inner`}>
                                {
                                    dataRoomType?.room_images.map((item, index) => {
                                        return (
                                            <div key={item.id || item.image_url} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                <img src={item.image_url} className="d-block w-100" alt={item.description} />
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className={cx("content")}>
                            <div className={`${cx("type")} d-flex align-items-center`}>
                                <span className="me-2">Loại phòng: </span>
                                <span>{dataRoomType?.type}</span>
                            </div>
                            <div className={`${cx("price")} d-flex align-items-center`}>
                                <span className="me-2">Giá phòng: </span>
                                <span>{dataRoomType?.price_per_night ?? "0 "}đ</span>
                            </div>
                            <div className={`${cx("quantity")} d-flex align-items-center`}>
                                <span className="me-2">Số lượng: </span>
                                <span>{dataRoomType?.quantity ?? "10/10 phòng trống"}</span>
                            </div>
                            <div className={`${cx("describe")} d-flex align-items-center`}>
                                <p>{dataRoomType?.description_detail ?? "Thông tin phòng chưa cập nhật"}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("comment")}>
                        <div className={cx("comment_title")}>
                            <h3><strong>Đánh giá gần đây</strong></h3>
                        </div>
                        <div className={cx("list")}>
                            {dataReviews && dataReviews.length > 0 ? dataReviews.map((review, index) => (
                                <div key={index} className={cx("item")}>
                                    <div className={cx("item_title")}>
                                        <img src={review.user.users_image} className="d-block w-100" alt={review.user.users_image} />
                                        <h3><strong>{review.user.name}</strong></h3>
                                    </div>
                                    <div className={cx("item_content")}>
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            )) : <p>Chưa có đánh giá nào.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCustomer;
