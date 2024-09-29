import { useEffect, useState } from 'react';
import { getRoomType } from '../../../services/Admin/RoomType';
import { Notification } from '../../../components/Response';
import ModalAdd from './ModalAdd';
import Table from './Table';
import ModalEdit from './ModalEdit';
import Filter from './Filter';



const RoomType = () => {

    const [isShowModal, setShowModal] = useState(false);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});

    const handleClose = () => {
        setShowModal(false);
        setShowModalEdit(false);
    }


    const [data, setData] = useState([]);

    const fetchData = async (params = {}) => {
        const response = await getRoomType(params);
        if (response.status >= 400 && response.status < 600) {
            Notification("error", response.data.message);
            if (response.status === 401) window.location.href = '/login';
        } else {
            setData(response.data); // Cập nhật state sau khi có dữ liệu
        }
    };
    useEffect(() => {
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
                        <li className="fs-10"><strong>Danh sách loại phòng</strong></li>
                    </ol>
                </nav>
                <h2 className="text-bold text-body-emphasis mb-5">Danh sách loại phòng</h2>
                <div className="d-flex justify-content-between">
                    <Filter fetchData={fetchData}/>
                    <div className="mb-3 d-flex justify-content-end">
                        <button type="button" className="btn btn-primary ms-2 d-flex justify-content-between" onClick={() => setShowModal(true)}>
                            <i className="bi bi-plus-lg"></i>
                            <div className="ms-2">Thêm loại phòng</div>
                        </button>
                    </div>
                </div>
            </div>
            {/* end */}

            {/* body */}
            <Table data={data} dataRoomType={setDataEdit} handleModalEdit={setShowModalEdit} />
            {/* end */}

            {/* modal add */}
            <ModalAdd
                show={isShowModal}
                handleClose={handleClose}
                onDataUpdated={fetchData}
            />
            {/* end */}
            {/* modal edit */}
            <ModalEdit
                show={isShowModalEdit}
                handleClose={handleClose}
                onDataUpdated={fetchData}
                dataEdit={dataEdit}
            />
            {/* end */}
        </div>
    );
}
export default RoomType;