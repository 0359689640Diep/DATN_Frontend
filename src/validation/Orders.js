import Joi from "joi";

// Lấy ngày hiện tại
const today = new Date().toISOString().split('T')[0]; // Định dạng YYYY-MM-DD

const ValidateOrders = Joi.object({
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
    check_in_date: Joi.date().required().greater(today).messages({
        'date.base': 'Ngày bạn đến phải là ngày hợp lệ',
        'date.greater': 'Ngày bạn đến không được nhỏ hơn ngày hiện tại',
        'any.required': 'Ngày bạn đến không được để trống',
    }),
    check_out_date: Joi.date().required().greater(Joi.ref('check_in_date')).messages({
        'date.base': 'Ngày bạn đi phải là ngày hợp lệ',
        'date.greater': 'Ngày bạn đi không được nhỏ hơn hoặc bằng ngày bạn đến',
        'any.required': 'Ngày bạn đi không được để trống',
    }),
    type: Joi.number().required().messages({
        'any.required': 'Loại thanh toán không được để trống',
    }),
    price_per_night: Joi.number().required().messages({
        'any.required': 'Giá phòng cho một đêm không được để trống',
        'number.base': 'Giá phòng phải là số',
    }),
    // Các trường dưới đây sẽ cho phép giá trị null hoặc chuỗi rỗng
    quanlity_service: Joi.string().optional().allow(null, ''),
    service_id: Joi.string().optional().allow(null, ''),
    note: Joi.string().optional().allow(null, ''),
    room_type_id: Joi.number().optional().allow(null, ''),
    total_price: Joi.number().optional().allow(null, ''),
    typeRoom: Joi.string().optional().allow(null, ''),
    deposit: Joi.number().optional().allow(null, ''),
    title: Joi.string().optional().allow(null, ''),
    actual_number_people: Joi.number().optional().allow(null, ''),
    service: Joi.array().optional().allow(null, ''),
});
export default ValidateOrders;
