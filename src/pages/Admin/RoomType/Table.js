const Table = ({ data, dataRoomType, handleModalEdit }) => {
    const handleEditRoom = (room) => {
        dataRoomType(room);
        handleModalEdit(true);
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" className="text-center">STT</th>
                    <th scope="col">Loại phòng</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col" className="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {/* Kiểm tra xem có dữ liệu không */}
                {data && data.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center">Không có dữ liệu</td>
                    </tr>
                ) : (
                    // Lặp qua dữ liệu và hiển thị các dòng trong bảng
                    data.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{item.type}</td>
                            <td>
                                <div className="d-flex justify-content-around">

                                    {item.room_images.length > 0 ?
                                        item.room_images.map((image, index) => (
                                            <img
                                                key={index} // Đừng quên thêm key cho mỗi phần tử trong danh sách
                                                src={image.image_url}
                                                alt={image.description}
                                                className="img-thumbnail"
                                                width="100"
                                            />
                                        ))
                                        : "Không có ảnh"} {/* Hiển thị thông báo nếu không có ảnh */}
                                </div>
                            </td>

                            {/* Giả sử bạn muốn hiển thị room_type.type thay vì room_type_id */}
                            <td className="text-center">
                                <button type="button" onClick={() => handleEditRoom(item)} className="btn bg-light-subtle text-info ms-2">
                                    <i className="bi bi-pencil-square"></i>
                                    <span className="ms-1">Sửa</span>
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
