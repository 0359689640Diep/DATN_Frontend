import Joi from "joi";


const ValidateLogin = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password không được để trống',
        'string.min': 'Mật khẩu phải có tối thiểu 6 ký tự',
    }),
});

export {ValidateLogin};