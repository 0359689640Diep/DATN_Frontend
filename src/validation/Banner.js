import Joi from "joi";

// Define the valid image extensions
const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const ValidateBanner = Joi.object({
    status_id: Joi.number().required().messages({
        'any.required': 'Trạng thái không được để trống',
        'number.base': 'Trạng thái phải là số',
    }),
    images: Joi.any().required().custom((value, helpers) => {
        if (Array.isArray(value)) {
            // Trường hợp `value` là mảng các file
            for (const file of value) {
                const extension = file.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(extension)) {
                    return helpers.message("Ảnh không đúng định dạng (chỉ chấp nhận jpg, jpeg, png, gif)");
                }
            }
        } else if (typeof value === 'string') {
            // Trường hợp `value` là chuỗi (khi thay đổi ảnh)
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
});

const ValidateBannerEdit = Joi.object({
    status_id: Joi.number().required().messages({
        'any.required': 'Trạng thái không được để trống',
        'number.base': 'Trạng thái phải là số',
    }),
    images: Joi.any(),
});

export  {ValidateBanner, ValidateBannerEdit};
