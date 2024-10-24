import Joi from "joi";


const {ValidateService} = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Tên không được để trống',
        'any.required': 'Tên không được để trống',
    }),
    price: Joi.number().required().messages({
        'any.required': 'Giá không được để trống',
        'number.base': 'Giá phải là số',
    }),
    room_type_id: Joi.number().required().messages({
        'any.required': 'Loại phòng không được để trống',
        'number.base': 'Loại phòng phải là số',
    }),
    status_id: Joi.number().required().messages({
        'any.required': 'Trạng thái không được để trống',
        'number.base': 'Trạng thái phải là số',
    }),
    description: Joi.string().optional(),
});

const ValidateAddUsersToService = Joi.object({
    bookings_id: Joi.number().required().messages({
        'any.required': 'Mã đơn hàng không được để trống',
        'number.base': 'Mã đơn hàng phải là số',
    }),
    list_users: Joi.array().items(
        Joi.object({
            user_id: Joi.number().required().messages({
                'any.required': 'Nhân viên không được để trống',
                'number.base': 'ID nhân viên phải là số',
            }),
            name: Joi.string().required().messages({
                'any.required': 'Tên nhân viên không được để trống',
            })
        })
    ).min(1).required().messages({
        'array.base': 'Danh sách nhân viên phải là một mảng',
        'array.min': 'Phải chọn ít nhất một nhân viên',
        'any.required': 'Danh sách nhân viên không được để trống',
    }),
});

export {ValidateService, ValidateAddUsersToService};