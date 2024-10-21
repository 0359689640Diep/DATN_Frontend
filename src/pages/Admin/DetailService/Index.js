import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getRoomType } from '../../../services/RoomType';
import { Notification } from '../../../components/Response';
import ModalAdd from './ModalAdd';
import Table from './Table';
import ModalEdit from './ModalEdit';
import Delete from './Delete';
import Filter from './Filter';
import { getServiceAdmin } from '../../../services/Services';

const DetailService = () => {
    const [roomTypes, setRoomTypes] = useState([]); // Lưu dữ liệu loại phòng vào state

    const [isShowModal, setShowModal] = useState(false);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const { id } = useParams();

    const handleClose = () => {
        setShowModal(false);
        setShowModalEdit(false);
    }

    const [data, setData] = useState([]);
    const fetchRoomTypes = async () => {
        const response = await getRoomType(); // Gọi hàm lấy loại phòng
        if (response.status >= 400 && response.status < 600) {
            Notification("error", response.data.message);
            if (response.status === 401) window.location.href = '/';
        } else {
            setRoomTypes(response.data); // Cập nhật state sau khi có dữ liệu
        }
    };
    const fetchData = async (params = {}) => {
        const response = await getServiceAdmin(params);
        if (response.status >= 400 && response.status < 600) {
            Notification("error", response.data.message);
            if (response.status === 401) window.location.href = '/';
        } else {
            setData(response.data); // Cập nhật state sau khi có dữ liệu
        }
    };
    useEffect(() => {
        fetchData();
        fetchRoomTypes();

    }, []); // Chỉ gọi khi component mount

    const handleDelete = (id) => {
        Delete(id, fetchData);
    }

    return (
        <div className="content" >

            {/* title */}
            <div className="px-5 py-4 bg-light-subtle">
                <nav className="mb-2">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="/admin" className="fs-10 text-decoration-none"><strong>Trang chủ</strong></a>
                        </li>
                        <li><i className="bi bi-chevron-right fs-10 m-2"></i></li>
                        <li className="fs-10"><a href='/admin/service'><strong>Danh sách dịch vụ</strong></a></li>
                        <li><i className="bi bi-chevron-right fs-10 m-2"></i></li>
                        <li className="fs-10">Chi tiết dịch vụ</li>
                    </ol>
                </nav>
                <h2 className="text-bold text-body-emphasis mb-5">Chi tiết dịch vụ</h2>
                <div className="d-flex justify-content-between">
                    <Filter fetchData={fetchData} roomTypes={roomTypes}/>
                    <div className="mb-3 d-flex justify-content-end">
                        <button type="button" className="btn btn-primary ms-2 d-flex justify-content-between" onClick={() => setShowModal(true)}>
                            <i className="bi bi-plus-lg"></i>
                            <div className="ms-2">Thêm nhân viên</div>
                        </button>
                    </div>
                </div>
            </div>
            {/* end */}

            {/* body */}
            <Table data={data} dataRoom={setDataEdit} handleModalEdit={setShowModalEdit} handleDelete={handleDelete} />
            {/* end */}

            {/* modal add */}
            <ModalAdd
                show={isShowModal}
                handleClose={handleClose}
                onDataUpdated={fetchData}
                roomTypes = {roomTypes}
            />
            {/* end */}
            {/* modal edit */}
            <ModalEdit
                show={isShowModalEdit}
                handleClose={handleClose}
                onDataUpdated={fetchData}
                dataEdit={dataEdit}
                roomTypes = {roomTypes}
            />
            {/* end */}
        </div>
    );
}
export default DetailService;