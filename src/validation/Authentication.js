import Joi from "joi";


const ValidateLogin = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Password không được để trống',
        'string.min': 'Mật khẩu phải có tối thiểu 8 ký tự',
    }),
});

const ValidateRegister = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Tên không được để trống',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Password không được để trống',
        'string.min': 'Mật khẩu phải có tối thiểu 8 ký tự',
    }),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Mật khẩu xác nhận không khớp',
        'string.empty': 'Nhập lại mật khẩu không được để trống',
    }),
});

const ValidateConfirmRegister = Joi.object({
    code: Joi.string().min(1).max(6).required().messages({
        'string.empty': 'Mã  không được để trống',
        'string.min': 'Mã phải có đủ 6 ký tự',
        'string.max': 'Mã phải có đủ 6 ký tự',
    }),
});

const ValidateforgotPassword = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
    }),
});
const ValidateforgotPasswordVerification = Joi.object({
    code: Joi.string().min(1).max(6).required().messages({
        'string.empty': 'Mã  không được để trống',
        'string.min': 'Mã phải có đủ 6 ký tự',
        'string.max': 'Mã phải có đủ 6 ký tự',
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Password không được để trống',
        'string.min': 'Mật khẩu phải có tối thiểu 8 ký tự',
    }),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Mật khẩu xác nhận không khớp',
        'string.empty': 'Nhập lại mật khẩu không được để trống',
    }),
});


export {ValidateLogin, ValidateRegister, ValidateConfirmRegister, ValidateforgotPassword, ValidateforgotPasswordVerification};