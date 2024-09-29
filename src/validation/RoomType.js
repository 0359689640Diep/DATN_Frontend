import Joi from "joi";

// Define the valid image extensions
const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const ValidateRoomType = Joi.object({
    type: Joi.string().allow('').messages({
        'string.empty': "Loại phòng không được để trống",
    }),
    images: Joi.any().custom((value, helpers) => {
        if (Array.isArray(value)) {
            // Trường hợp khi `value` là mảng các đối tượng File
            for (const file of value) {
                const extension = file.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(extension)) {
                    return helpers.message("Ảnh không đúng định dạng (chỉ chấp nhận jpg, jpeg, png, gif)");
                }
            }
        } else if (typeof value === 'string') {
            // Trường hợp khi `value` là chuỗi (dùng trong quá trình change)
            const extension = value.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(extension)) {
                return helpers.message("Ảnh không đúng định dạng (chỉ chấp nhận jpg, jpeg, png, gif)");
            }
        } else {
            return helpers.message("Dữ liệu ảnh không hợp lệ");
        }
        return value;
    }).messages({
        'any.required': "Ảnh không được để trống",
    })
});

export default ValidateRoomType;
