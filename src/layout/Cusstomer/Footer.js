import className from "../../components/ClassName";
import style from "./style.scss";
const Footer = () => {
    const cx = className(style);
    return (
        <footer className={`${cx("footer")}`}>
            <div className="container text-center">
                <div className="row align-items-start">
                    <div className="col">
                        <ul>
                            <li><strong>Về Hotel Henry</strong></li>
                            <li><a href="/">Chúng tôi</a></li>
                            <li><a href="/">Hotel Henry Block</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul>
                            <li><strong>Thông tin cần biết</strong></li>
                            <li><a href="/">Điều kiện và điều khoản</a></li>
                            <li><a href="/">Quy chế hoạt động</a></li>
                            <li><a href="/">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul>
                            <li><strong>Doanh nghiệp chúng tôi</strong></li>
                            <li><a href="/">Mã số: 1234567898</a></li>
                            <li><a href="/">Liên hệ: 123456789</a></li>
                            <li><a href="/">Email: hotelhenry@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container text-center mt-4">
                <div className="row align-items-center">
                    <div className="col">
                        <div className={`${cx("content")} text-start`}>
                            <h4>Địa chỉ của Hotel Henry</h4>
                            <div className="d-flex justify-content-center align-items-center">
                                <i className="bi bi-geo-alt"></i>
                                <p className="ms-2">Địa chỉ: số 12A1 Tu Hoàn, Phương Canh thành phố Hà Nội</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        {/* Giữ cột trống để thẳng hàng */}
                    </div>
                    <div className="col">
                        <div className={`${cx("map")}`}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.71653642094844!2d105.7521977699397!3d21.054098969584103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454e5d3b6429b%3A0x8f5fcabcc38c88ef!2zM1EzMitQUkgsIFBow7pjIERp4buFbiwgQuG6r2MgVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1727712355217!5m2!1svi!2s"
                                width="300"
                                height="250"
                                style={{ border: 0, margin: "0 10px" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
    
}

export default Footer;