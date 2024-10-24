const Table = ({ data, dataBooking, handleModalBooking }) => {
    const handleBooking = (data) => {
        dataBooking(data);
        handleModalBooking(true);
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="col text-center">STT</th>
                    <th className="col text-start">Mã đơn hàng</th>
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
                                <td className="col text-start"><a href={`/admin/bookings/${item.id}`}>{item.id}</a></td>
                                <td className="col text-start">{item.room?.number ?? <span className="text-danger">Chưa nhận phòng</span>}</td>
                                <td className="col text-start">{item.room_type.type}</td>
                                <td className="col text-start">{item.check_in_date}</td>
                                <td className="col text-start">{item.check_out_date}</td>
                                <td className="col text-end">{item.total_price} đ</td>
                                <td className="col text-start">{item.created_at}</td>
                                <td>
                                    <p style={{ color: item.status.color }}>{item.status.name}</p>
                                </td>
                                <td className="col  text-center">
                                {
                                    item.room?.number ? 
                                    <a href={`/detail-transaction-history/${item.id}`}>
                                        <i className="bi bi-eye"></i>
                                    </a>
                                    :
                                    <i onClick={() => handleBooking(item)} className="bi bi-clipboard-check"></i>
                                }
                                </td>
                            </tr>
                        )) :
                        <tr>
                            <td colSpan="9" className="text-center text-danger">Không có dữ liệu</td>
                        </tr>
                }
            </tbody>
        </table>
    );
};

export default Table;
