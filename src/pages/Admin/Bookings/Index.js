import { useEffect, useState } from 'react';
import { Notification } from '../../../components/Response';
import Table from './Table';
import Filter from './Filter';
import { getBookingAdmin } from '../../../services/Bookings';
import ModalAdd from './ModalAdd';
import { getRoomType } from '../../../services/RoomType';

const Bookings = () => {
    const [isShowModalBooking, setShowModalBooking] = useState(false);
    const [roomTypes, setRoomTypes] = useState([]);
    const [data, setData] = useState([]);
    const [dataBooking, setDataBooking] = useState({});
    const handleClose = () => {
        setShowModalBooking(false);
    }

    const fetchData = async (params = {}) => {
        const response = await getBookingAdmin(params);
        if (response.status >= 400 && response.status < 600) {
            Notification("error", response.data.message);
            if (response.status === 401) window.location.href = '/';
        } else {
            setData(response.data); // Cập nhật state sau khi có dữ liệu
        }
    };
    const fetchRoomTypes = async () => {
        const response = await getRoomType(); // Gọi hàm lấy loại phòng
        if (response.status >= 400 && response.status < 600) {
            Notification("error", response.data.message);
            if (response.status === 401) window.location.href = '/';
        } else {
            setRoomTypes(response.data); // Cập nhật state sau khi có dữ liệu
        }
    };

    useEffect(() => {
        fetchRoomTypes();
        fetchData();
    }, []); // Chỉ gọi khi component mount


    return (
        <div className="content" >

            {/* title */}
            <div className="px-5 py-4 bg-light-subtle">
                <nav className="mb-2">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="/admin" className="fs-10 text-decoration-none"><strong>Trang chủ</strong></a>
                        </li>
                        <li>
                            <i className="bi bi-chevron-right fs-10 m-2"></i>
                        </li>
                        <li className="fs-10"><strong>Danh sách đặt phòng</strong></li>
                    </ol>
                </nav>
                <h2 className="text-bold text-body-emphasis mb-5">Danh sách đặt phòng</h2>
                <div className="d-flex justify-content-between">
                    <Filter fetchData={fetchData} />
                </div>
            </div>
            {/* end */}

            {/* body */}
            <Table data={data}  dataBooking={setDataBooking} handleModalBooking={setShowModalBooking}/>
            {/* end */}

            {/* modal add */}
            <ModalAdd
                show={isShowModalBooking}
                handleClose={handleClose}
                onDataUpdated={fetchData}
                dataBooking={dataBooking}
                roomTypes = {roomTypes}
            />
        </div>
    );
}
export default Bookings;