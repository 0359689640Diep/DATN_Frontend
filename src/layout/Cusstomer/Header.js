import { useState } from "react";
import { images } from "../../asses";
import className from "../../components/ClassName";
import style from "./style.scss";

const Headers = () => {
    const token = localStorage.getItem("accessToken");
    const [hiden, setHiden] = useState("d-none");

    const handleClick = () => {
        if (hiden === "d-none") {
            setHiden("d-block");
        } else {
            setHiden("d-none");
        }
    }

    const cx = className(style);
    return (
        <header className={cx("header")}>
            <div className="container">
                <div className="row ">
                    <div className={`col`}>
                        <img className={`${cx("imges")}`} src={images.logo} alt="Hotel Henry" />
                    </div>
                    <div className={`${cx("nav")} col d-flex justify-content-between align-items-center`}>
                        <div className={cx("content1")}>
                            <a href="/">Review</a>
                            <span className={`${cx("hover-underline")}`}></span>
                        </div>
                        <div className={cx("content2")}>
                            <a href="/">Liên hệ</a>
                            <span className={`${cx("hover-underline")}`}></span>
                        </div>
                        <div className={cx("content3")}>
                            <a href="/">Về chúng tôi</a>
                            <span className={`${cx("hover-underline")}`}></span>
                        </div>
                    </div>
                    {
                        token === null || token === "undefined" ?
                            <div className="col d-flex justify-content-end align-items-center">
                                <a href="/"><button type="button" className={`${cx("button")} btn ms-2 px-4 py-1`}>Đăng nhập</button></a>
                                <a href="/"><button type="button" className={`${cx("button")} btn ms-2 px-4 py-1`}>Đăng ký</button></a>
                            </div> :
                            <div className={`${cx("person")} col`}>
                                <div onClick={handleClick} className={`${cx("title")} d-flex justify-content-end align-items-center position-relative`}>
                                    <i className="bi bi-person-fill"></i>
                                    <p className="m-0">Tài khoản</p>
                                    <i className="bi bi-chevron-down"></i>
                                    <span className={`${cx("hover-underline")}`}></span>
                                </div>
                                <div className={`${cx("content")} ${hiden}`}>
                                    <div className={`${cx("titleContent")}`}>
                                        <div className="d-flex justify-content-center align-items-center"><img src={images.logo} alt="Hotel Henry" /></div>
                                        <div className="d-flex justify-content-center align-items-center"><strong>Vũ Điệp</strong></div>
                                    </div>
                                    <div className={`${cx("mainContent")}`}>
                                        <a href="/" className="d-flex justify-content-start align-items-center">
                                            <i className="bi bi-activity"></i>
                                            <p className="ms-1">Lịch sử giao dịch</p>
                                        </a>
                                        <a href="/" className="d-flex justify-content-start align-items-center">
                                            <i className="bi bi-person-fill-gear"></i>
                                            <p className="ms-1">Quản lý tài khoản</p>
                                        </a>
                                    </div>
                                    <a href="/" className={`${cx("footerContent")} d-flex justify-content-center align-items-end`}>
                                        <button type="button">Đăng xuất</button>
                                    </a>
                                </div>
                            </div>

                    }
                </div>
            </div>
        </header>
    );
}

export default Headers;