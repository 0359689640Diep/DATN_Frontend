import { toast } from "react-toastify";

/** Hàm có tác dụng hiển thị thông báo
 * @param {string} type Loại thông báo (success, warning, error)
 * @param {string} message Nội dung thông báo
*/
const Notification = (type, message) => {
    toast[type](message);
}

/** Hàm có tác dụng sử lý dữ liệu trả về  từ backend
 * @param {Object} res Object trả về từ backend
 * @param {string} redirect route chuyển hướng nếu bạn muốn nhận thông báo rồi chuyển hướng đến đâu đó
 */
const Response = (res, redirect = false) => {
    if (res.status >= 400 && res.status < 500) {
        Notification("warning", res.data.message);
        if (redirect) window.location.href = redirect;;
    } else if (res.status >= 500) {
        Notification("error", res.data.message);
    } else if (res.status >= 200 && res.status < 300) {
        Notification("success", res.data.message);
        if (redirect) window.location.href = redirect;;
    } else {
        Notification("error", "Vui lòng gọi IT");
    }

}

export { Notification, Response }