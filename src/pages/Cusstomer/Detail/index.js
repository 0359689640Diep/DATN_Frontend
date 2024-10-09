import { useEffect, useState } from "react";
import className from "../../../components/ClassName";
import style from "./style.module.scss";
import CustomerNav from "../../../components/CustomerNav";
import CustomerSlibar from "../../../components/CustomerSlibar";
import Star from "../../../components/Star";

const DetailCustomer = () => {
    const cx = className(style);
    const listNav = [
        { icon: 'house', title: 'Trang chủ', url: '/' },
        { icon: 'chevron-right', title: 'Chi tiết phòng', url: '#' },
    ];

    return (
        <div style={{ padding: "1% 17%" }}>

            <CustomerNav listNav={listNav} />
            <div className="py-2 d-flex justify-content-between">
                <CustomerSlibar />
                <div className={`${cx("content")}`}>
                    <div className={`${cx("title")} d-flex justify-content-between`}>
                        <div className={`${cx("content")}`}>
                            <h3><strong>Chi tiết phòng đôi</strong></h3>
                            <div className={cx('star')}><Star star={5} /></div>
                            <p>Với không gian rỗng rãi phù hợp với 1 gia đình là sự lựa chọn hoàn hảo dành cho bạn</p>
                        </div>
                        <button type="button" className="btn ">Đặt ngay</button>
                    </div>
                    <div className={`${cx('main')}`}>
                        <div id="carouselExample" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" className="d-block w-100" alt="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" />
                                </div>
                                <div className="carousel-item">
                                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" className="d-block w-100" alt="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" />
                                </div>
                                <div className="carousel-item">
                                    <img src="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" className="d-block w-100" alt="http://127.0.0.1:8000/storage/uploads/YqegfRNoWx6gpkkmOXEwwqoEJeNqtbw3xdBBXEKN.jpg" />
                                </div>
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
                                <span>Phòng đôi</span>
                            </div>
                            <div className={`${cx("price")} d-flex align-items-center`}>
                                <span className="me-2">Giá phòng: </span>
                                <span>150,000 đ</span>
                            </div>
                            <div className={`${cx("quantity")} d-flex align-items-center`}>
                                <span className="me-2">Số lượng: </span>
                                <span>10/</span>
                                <span> 10 phòng trống</span>
                            </div>
                            <div className={`${cx("describe")} d-flex align-items-center`}>
                                <p className="me-2">Tổng quan phòng: Phòng Deluxe Valley View được thiết kế với số lượng 57 phòng với các tiện nghi như, bữa sáng với món ăn bản địa tươi ngon, sử dụng bể bơi vô cực view thung lũng Mường Hoa, phòng Gym & Sauna, Sử dụng xe đạp, xe điện trong khu nghỉ dưỡng , trà, cà phê, hoa quả, ô mai, mứt gừng và 2 chai nước suối trong phòng, Xe đưa đón miễn phí vào thị trấn theo khung giờ cố định: Từ Sapa Jade Hill Resort & Spa vào thị xã (Nhà thờ đá): 9:00, 12:00, 15:00 +) Từ Thị xã (Nhà thờ đá) về Sapa Jade Hill Resort & Spa: 9:45, 12:45, 15:40
                                Phụ thu trẻ em:  Dưới 6 tuổi miễn phí 01 bé/ phòng. Kê giường phụ 450.000VNĐ Trẻ dưới 6 thứ hai hoặc từ 6-11 450.000</p>
                                                               </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailCustomer;
