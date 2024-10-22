import axios from "axios";

// tạo base api
const httpRequest = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});


/**Hàm có tác dụng gọi api thực hiện việc xóa dữ liệu
 * @param {string} api cần xóa
 * @param {number} id cần xóa
 */
export const remote = async (api, id) => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await httpRequest.delete(`${api}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response

    } catch (error) {
        return error.response;
    }
}

/**Hàm có tác dụng gọi api thực hiện việc cập nhật dữ liệu
 * @param {string} api cần cập nhật
 * @param {object} data cần cập nhật
 * @param {number} id cần cập nhật
 * @param {boolean} tokens có token không
 * @param {string} header kiểu dữ liệu
 */
export const update = async (api, data, id, tokens = false, headers = {}) => {
    const token = localStorage.getItem("accessToken");
    
    try {
        // Thêm header Authorization nếu cần
        if (tokens === true) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        // Nếu headers không chứa 'Content-Type', đặt mặc định là 'multipart/form-data'
        if (!headers["Content-Type"]) {
            headers["Content-Type"] = "multipart/form-data";
        }
        // Gửi yêu cầu PUT với headers đã cấu hình
        const response = await httpRequest.put(`${api}${id}`, data, {headers: { ...headers }});

        return response;
    } catch (error) {
        return error.response;
    }
}


/**Hàm có tác dụng gọi api thực hiện việc thêm dữ liệu
* @param {string} api cần thêm
* @param {object} option kiểu dữ liệu
* @param {boolean} tokens có token không
*/
export const get = async (api, tokens = false, option = {}) => {
    const token = localStorage.getItem("accessToken");

    try {
        // Kiểm tra xem có token được truyền vào không và thiết lập header nếu có
        if (tokens) {
            option.headers = {
                ...option.headers,
                Authorization: `Bearer ${token}`
            };
        }

        // Gửi request với params (nếu có) và các option khác
        const response = await httpRequest.get(api, {
            ...option, // Bao gồm tất cả option được truyền vào, bao gồm cả params
        });
        // Trả về dữ liệu từ response, cùng với mã lỗi 200 để biểu thị thành công
        return {
            status: response.status || 200,
            data: response.data.data,
            message: response.data.message
        };
    } catch (error) {
        // Xử lý lỗi và trả về thông tin lỗi kèm theo mã lỗi và thông báo
        return {
            status: error.response?.status || 500, // Sử dụng mã lỗi từ response nếu có, mặc định là 500
            data: error.response?.data || null,   // Trả về nội dung lỗi nếu có
            message: error.message || 'An error occurred'
        };
    }
};



/**Hàm có tác dụng gọi api thực hiện việc cập nhật dữ liệu
 * @param {string} api cần cập nhật
 * @param {object} data cần cập nhật
 * @param {number} id cần cập nhật
 * @param {string} header kiểu dữ liệu
 */
export const post = async (api, data, headers = '"Content-Type": "multipart/form-data"') => {

    const token = localStorage.getItem("accessToken");

    try {

        const response = await httpRequest.post(`${api}`, data, {
            headers: {
                headers,
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}
