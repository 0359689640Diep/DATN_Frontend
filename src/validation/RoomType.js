import Joi from "joi";

// Define the valid image extensions
const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const ValidateRoomType = Joi.object({
    type: Joi.string().required().messages({
        'any.required': 'Loại phòng không được để trống',
        'string.empty': "Loại phòng không được để trống",
    }),
    price_per_night: Joi.number().required().messages({
        'any.required': 'Giá phòng cho một đêm không được để trống',
        'number.base': 'Giá phòng phải là số',
    }),
    defaul_people: Joi.number().required().messages({
        'any.required': 'Số người tối đa không được để trống',
        'number.base': 'Số người tối đa phải là số',
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
    }),
    description: Joi.string().optional(),

});

export default ValidateRoomType;
