import { useEffect, useState } from "react";
import className from "../../../components/ClassName";
import style from "./style.module.scss";
import CustomerNav from "../../../components/CustomerNav";
import { confirmBooking, getBooking } from "../../../services/Bookings";
import { Notification } from "../../../components/Response";

const TransactionHistory = () => {
    const cx = className(style);

    const [data, setData] = useState([]); // Dữ liệu hiển thị

    const listNav = [
        { icon: 'house', title: 'Trang chủ', url: '/' },
        { icon: 'chevron-right', title: 'Lịch sử giao dịch', url: '#' },

    ];

    const fetchData = async () => {
        try {
            const response = await getBooking();
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };
    const orderConfirmation = async () => {
        // Lấy các params từ URL
        const searchParams = new URLSearchParams(window.location.search);
        
        // Danh sách các tham số cần thiết
        const paramNames = [
            'vnp_Amount',
            'vnp_BankCode',
            'vnp_BankTranNo',
            'vnp_CardType',
            'vnp_OrderInfo',
            'vnp_PayDate',
            'vnp_ResponseCode',
            'vnp_TmnCode',
            'vnp_TransactionNo',
            'vnp_TransactionStatus',
            'vnp_TxnRef',
            'vnp_SecureHash'
        ];
    
        // Tạo đối tượng params và kiểm tra sự tồn tại của các giá trị
        const params = paramNames.reduce((acc, name) => {
            const value = searchParams.get(name);
            if (value) {
                acc[name] = name === 'vnp_OrderInfo' ? decodeURIComponent(value) : value;
            }
            return acc;
        }, {});
    
        // Kiểm tra xem tất cả các tham số có tồn tại không
        if (Object.keys(params).length === paramNames.length) {
            const response = await confirmBooking(params, params.vnp_TxnRef);
            
            if (response.status === 200) {
                setData(response.data);
                Notification("success", response.data.message);
    
                // Xóa các tham số từ searchParams
                paramNames.forEach(param => searchParams.delete(param));
    
                // Cập nhật URL mà không làm mới trang
                const newUrl = window.location.origin + window.location.pathname + '?' + searchParams.toString();
                window.history.replaceState({}, '', newUrl);
            }
        }
    }


    

    useEffect(() => {
        orderConfirmation();
        fetchData(); // Lấy dữ liệu ban đầu khi component render
    }, []);

    return (
        <div style={{ padding: "1% 17%" }}>
            <CustomerNav listNav={listNav} />
            <div className={`${cx("cotent")} text-center`}>
                <h2>DANH SÁCH LỊCH SỬ GIAO DỊCH CỦA BẠN</h2>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th className="col text-center">STT</th>
                        <th className="col text-start">Số phòng</th>
                        <th className="col text-start">Loại phòng</th>
                        <th className="col text-start">Thời gian đến</th>
                        <th className="col text-start">Thời gian đi</th>
                        <th className="col text-end">Tổng tiền</th>
                        <th className="col text-start">Thời gian thực hiện</th>
                        <th className="col text-start">Trạng thái</th>
                        <th className="col  text-center">Hành động</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className="col text-center">{index + 1}</td>
                                    <td className="col text-start">{item.room?.number}</td>
                                    <td className="col text-start">{item.room_type.type}</td>
                                    <td className="col text-start">{item.check_in_date}</td>
                                    <td className="col text-start">{item.check_out_date}</td>
                                    <td className="col text-end">{item.total_price}</td>
                                    <td className="col text-start">{item.created_at}</td>
                                    <td>
                                        <p style={{ color: item.status.color }}>{item.status.name}</p>
                                    </td>
                                    <td className="col  text-center">
                                        <a href={`/detail-transaction-history/${item.id}`}>
                                            <i className="bi bi-eye"></i>
                                        </a>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="9" className="text-center text-danger">Không có dữ liệu</td>
                            </tr>

                    }
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
