import { confirmAlert } from "react-confirm-alert";
import { Notification } from "../../../components/Response";
import { deleteServiceAdmin } from "../../../services/Services";

const Delete = (id, onDataUpdated) => {
    const handleDelete = async (id) => {
        const response = await deleteServiceAdmin(id); // Sử dụng tên khác để tránh xung đột
        if (response.status === 201) {
            Notification("success", response.data.message);
            onDataUpdated(); // Cập nhật lại dữ liệu
        } else {
            Notification("error", "Xóa dịch vụ thất bại");
        }
    };

    confirmAlert({
        title: "Xác nhận xóa",
        message: "Bạn có chắc muốn xóa dịch vụ này không?",
        buttons: [
            {
                label: "Đồng ý",
                onClick: () => handleDelete(id), // Gọi hàm handleDelete
            },
            {
                label: "Hủy",
            },
        ],
    });
};

export default Delete;
