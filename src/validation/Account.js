import Joi from "joi";

const validateAccount = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Tên không được để trống',
        'any.required': 'Tên không được để trống',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            'any.required': 'Số điện thoại không được để trống',
            'string.empty': 'Số điện thoại không được để trống',
            'string.length': 'Số điện thoại phải có độ dài 10 ký tự',
            'string.pattern.base': 'Số điện thoại phải là các ký tự số',
        }),
    address: Joi.string().required().messages({
        'string.empty': 'Địa chỉ không được để trống',
        'any.required': 'Địa chỉ không được để trống',
    }),
    password_old: Joi.string().optional(),
    password_new: Joi.string().optional(),
    image: Joi.any().required(), // Đảm bảo trường image là bắt buộc và có thể là một tệp
});


export { validateAccount };
