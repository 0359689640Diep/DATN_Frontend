const Table = ({ data, dataRoom, handleModalEdit, handleDelete}) => {
    const handleEditRoom = (room) => {
        dataRoom(room);
        handleModalEdit(true);
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" className="text-center">STT</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Loại phòng</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col" className="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {/* Kiểm tra xem có dữ liệu không */}
                {data && data.length === 0 ? (
                    <tr>
                        <td colSpan="9" className="text-center">Không có dữ liệu</td>
                    </tr>
                ) : (
                    // Lặp qua dữ liệu và hiển thị các dòng trong bảng
                    data.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>{item.room_type?.type ?? ""}</td>
                            <td>
                                <p style={{ color: item.status.color }}>{item.status.name}</p>
                            </td>
                            {/* Giả sử bạn muốn hiển thị room_type.type thay vì room_type_id */}
                            <td className="text-center">
                                <button type="button" onClick={() => handleEditRoom(item)} className="btn bg-light-subtle text-info ms-2">
                                    <i className="bi bi-pencil-square"></i>
                                    <span className="ms-1">Sửa</span>
                                </button>
                                <button type="button" className="btn bg-light-subtle text-danger ms-2" onClick={() => handleDelete(item.id)} >
                                    <i className="bi bi-trash"></i>
                                    <span className="ms-1">Xóa</span>
                                </button>
                            </td>
                        </tr>
                    ))

                )}
            </tbody>
        </table>
    );
};

export default Table;
