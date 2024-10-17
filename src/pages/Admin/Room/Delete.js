import { confirmAlert } from "react-confirm-alert";
import { Notification } from "../../../components/Response";
import { deleteRoom } from "../../../services/Room";

const Delete = (id, onDataUpdated) => {
    const handleDeleteRoom = async (id) => {
        const response = await deleteRoom(id); // Sử dụng tên khác để tránh xung đột
        if (response.status === 200) {
            Notification("success", response.data.message);
            onDataUpdated(); // Cập nhật lại dữ liệu
        } else {
            Notification("error", "Xóa phòng thất bại");
        }
    };

    confirmAlert({
        title: "Xác nhận xóa",
        message: "Bạn có chắc muốn xóa phòng này không?",
        buttons: [
            {
                label: "Đồng ý",
                onClick: () => handleDeleteRoom(id), // Gọi hàm handleDeleteRoom
            },
            {
                label: "Hủy",
            },
        ],
    });
};

export default Delete;
