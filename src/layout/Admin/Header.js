import { useState } from "react";
import { images } from "../../asses";

export default function Headers() {
    const [display, setDisplay] = useState("d-none");

    const handleClick = () => {
        if(display === "d-none"){
            setDisplay("d-block");
        }else{
            setDisplay("d-none");
        }
    }
    return (
        <header className="d-flex justify-content-between align-items-center sticky-top px-4 py-2 border-bottom" style={{ position: "relative" }}>
            <a href="/admin" className="text-decoration-none">
                <div className="d-flex align-items-center">
                    <img alt="Logo" src={images.logo} className="img-thumbnail" width="200" />
                    <p className="logo-text fs-8 ms-2 my-2 fw-bolder d-none d-sm-block text-center">HOTEL HENRY</p>
                </div>
            </a>

            <div className="text-decoration-none" onClick={handleClick}>
                <div className="d-flex align-items-center">
                    <img
                        alt="Logo"
                        src={images.logo}
                        className="rounded-circle"
                        width="40"
                        style={{ borderRadius: "50%" }}
                    />
                </div>
            </div>
            <div className={`container bg-white z-3 rounded px-3 py-3 border ${display}`} style={{ position: "absolute", bottom: "-270px", right: "10px", width: "250px" }}>
                <div className=" align-items-center">
                    <div className="d-flex justify-content-center mt-3">
                        <img
                            alt="Logo"
                            src="https://lh3.googleusercontent.com/a/ACg8ocKknPL49jY02ZWmG-duQTzancX98xa16aGRHDYqqjF0v5jo_imz=s96-c"
                            className="rounded-circle"
                            width="40"
                            style={{ borderRadius: "50%" }}
                        />
                    </div>
                    <p className="logo-text fs-10 ms-2 my-2  d-none d-sm-block text-center">Vũ Điệp</p>
                </div>
                <ul className="nav d-flex flex-column mb-2 pb-1 mt-5">
                    <li className="nav-item ">
                        <a href="/log-out" className="text-decoration-none text-decoration-none text-black fs-10">
                            <i className="bi bi-person"></i>
                            <span className=" ms-2">Thông tin</span>
                        </a>
                    </li>
                </ul>
                <ul className="nav d-flex flex-column mb-2 pb-1 mt-1 border-top" >
                    <li className="nav-item mt-2">
                        <a href="/log-out" className="text-decoration-none text-decoration-none text-black fs-10  d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-outline-secondary" style={{ width: "100%" }}>
                                <i className="bi bi-box-arrow-right"></i>
                                <span className=" ms-2">Đăng xuất</span>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    )
}
