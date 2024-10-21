import Joi from "joi";
// Lấy ngày hiện tại
const ValidateBookings = Joi.object({
    room_id: Joi.number().required().messages({
        'any.required': 'Phòng không được để trống',
        'number.base': 'Phòng phải là số',
    }),
    room_type_id: Joi.number().required().messages({
        'any.required': 'Loại phòng không được để trống',
        'number.base': 'Loại phòng phải là số',
    }),
    actual_number_people: Joi.number().required().messages({
        'any.required': 'Số lượng người thực tế không được để trống',
    }),
    type: Joi.number().required().messages({
        'any.required': 'Loại thanh toán không được để trống',
    }),
    check_in_date: Joi.string().optional().allow(null, ''),
    check_out_date: Joi.string().optional().allow(null, ''),
    // Các trường dưới đây sẽ cho phép giá trị null hoặc chuỗi rỗng
    quanlity_service: Joi.string().optional().allow(null, ''),
    service_id: Joi.string().optional().allow(null, ''),
    note: Joi.string().optional().allow(null, ''),
    total_price: Joi.string().optional().allow(null, ''),
    deposit_amount: Joi.string().optional().allow(null, ''),
    deposit: Joi.number().optional().allow(null, ''),
    surcharge: Joi.number().optional().allow(null, ''),
    payments_amount: Joi.string().optional().allow(null, ''),
    price: Joi.optional().allow(null, ''),
    typeRoom: Joi.optional().allow(null, ''),
    status: Joi.optional().allow(null, ''),
    service: Joi.array().optional().allow(null, ''),
})

export { ValidateBookings}