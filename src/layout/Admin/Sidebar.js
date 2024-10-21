import { useState } from 'react';

export default function Sidebar() {
    const [openIndex, setOpenIndex] = useState(null);
    const [iconDirections, setIconDirections] = useState({});

    const sidebar = [
        {
            icon: "bi-box-seam",
            name: "Quản lý phòng",
            children: [
                { url: "/admin/room-type", name: "Loại phòng" },
                { url: "/admin/list-room", name: "Danh sách phòng" },
                { url: "/admin/service", name: "Quản lý dịch vụ" },
            ]
        },
        {
            icon: "bi-person-gear",
            name: "Quản lý tài khoản",
            children: [
                { url: "/admin/account", name: "Danh sách tài khoản" },
            ]
        },
        {
            icon: "bi-box2-fill",
            name: "Quản lý đặt phòng",
            children: [
                { url: "/admin/bookings/new", name: "Đặt phòng mới" },
                { url: "/admin/bookings", name: "Danh sách đặt phòng" },
            ]
        },
        {
            icon: "bi-sliders2-vertical",
            name: "Quản lý khác",
            children: [
                { url: "/admin/banner", name: "Quản lý banner" },
                { url: "/danh-sach-dat-phong", name: "Danh sách đặt phòng" },
            ]
        },
    ];

    const handleToggle = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
            setIconDirections(prevState => ({
                ...prevState,
                [index]: "right" // Set icon direction to "right" when closed
            }));
        } else {
            setOpenIndex(index);
            setIconDirections(prevState => ({
                ...prevState,
                [index]: "down" // Set icon direction to "down" when opened
            }));
        }
    };

    return (
        <div className="navbar-vertical-content">
            <ul className="navbar-nav flex-column">
                {sidebar.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.url}
                            className="nav-link hover-bg cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();  // Prevent default anchor behavior
                                if (item.children) {
                                    handleToggle(index);
                                }
                            }}
                        >
                            <div className='d-flex align-items-center'>
                                <span className='nav-link-icon'>
                                    <i className={`bi bi-chevron-${iconDirections[index] || "right"}`}></i>
                                </span>
                                <span className='nav-link-icon ms-2'>
                                    <i className={`bi ${item.icon} fs-7`}></i>
                                </span>
                                <span className='nav-link-text ms-2'>{item.name}</span>
                            </div>
                        </a>
                        {item.children && openIndex === index && (
                            <ul className="navbar-nav flex-column ms-3">
                                {item.children.map((child, childIndex) => (
                                    <li key={childIndex}>
                                        <a href={child.url} className="nav-link">{child.name}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
